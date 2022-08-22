import { HEADER_HEIGHT } from "@components/layout/HeaderComponent";
import {
  Button,
  createStyles,
  Grid,
  List,
  MantineTheme,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { SetFieldValue } from "@mantine/form/lib/types";
import {
  useDebouncedState,
  useDisclosure,
  UseListStateHandlers,
} from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { IconSearch } from "@tabler/icons";
import { trpc } from "@utils/trpc";
import type { Plugin } from "@utils/types/craftex";
import { create } from "domain";
import { useEffect, useState } from "react";
import {
  ListCreateInputs,
  ListSectionProps,
  PluginNameSchema,
} from "./_schemas";

const useStyles = createStyles((theme) => ({
  root: {
    height: `calc(100vh - ${HEADER_HEIGHT}px - ${theme.spacing.md}px)`,
  },
}));

const useShowcaseStyles = createStyles((theme) => ({
  root: {
    cursor: "pointer",
  },
}));

const ListPluginSearch: React.FC<
  ListSectionProps & { handlers: UseListStateHandlers<Plugin> }
> = ({
  form: { getInputProps, setFieldError, setFieldValue },
  handlers,
  selected,
  span,
}) => {
  const { classes, theme } = useStyles();
  const [pluginName, setPluginName] = useDebouncedState("", 500);

  const { data: filteredPlugins } = trpc.useQuery(
    [
      "plugin.unprotected.filtered",
      {
        filter: pluginName,
      },
    ],
    {
      enabled: PluginNameSchema.safeParse(pluginName).success,
      onSuccess: (data) => {
        if (data.length < 1)
          setFieldError(
            "pluginName",
            "We couldn't find a plugin with that name"
          );
      },
    }
  );
  return (
    <Grid.Col className={classes.root} span={span}>
      <TextInput
        placeholder="Search"
        pb="xs"
        icon={<IconSearch size={12} stroke={1.5} />}
        onInput={({ currentTarget: { value } }) => setPluginName(value)}
        {...getInputProps("pluginName")}
      />
      <ScrollArea.Autosize maxHeight={`calc(98% - ${theme.spacing.xl}px)`}>
        {filteredPlugins &&
          filteredPlugins.map((p) => (
            <PluginShowcase
              selected={selected}
              theme={theme}
              key={p.id}
              plugin={p}
              handlers={handlers}
            />
          ))}
      </ScrollArea.Autosize>
    </Grid.Col>
  );
};

const PluginShowcase: React.FC<{
  plugin: Plugin;
  theme: MantineTheme;
  selected: Plugin[];
  handlers: UseListStateHandlers<Plugin>;
}> = ({ plugin, theme, handlers, selected }) => {
  const { classes } = useShowcaseStyles();
  const [isSelected, { open: select, close: deselect }] = useDisclosure(false);

  // probably there's a better way, but my one brain cell isn't enough to figure it out at 1:30am
  useEffect(() => {
    if (selected.some(({ id }) => id === plugin.id)) select();
  }, [selected]);

  const appendPlugin = (plugin: Plugin) => {
    if (isSelected) return;

    handlers.append(plugin);
    select();
  };

  const removePlugin: (toRemove: Plugin) => void = ({ id: toRemoveId }) => {
    if (!isSelected) return;

    handlers.filter(({ id }) => id !== toRemoveId);
    deselect();
  };

  return (
    <li
      key={plugin.id}
      className={classes.root}
      onClick={() => (isSelected ? removePlugin(plugin) : appendPlugin(plugin))}
    >
      <Text
        sx={
          isSelected
            ? {
                color: theme.colors.brand[6],
              }
            : {}
        }
        size="xl"
        weight={600}
      >
        {plugin.title}
      </Text>
      <Text size="xs">
        By {plugin.developers.find((d) => !!d)?.name ?? "WH OMEGALUL"}{" "}
        {plugin.developers.length > 1 && (
          <span>(+{plugin.developers.length - 1})</span>
        )}
      </Text>
    </li>
  );
};

export default ListPluginSearch;
