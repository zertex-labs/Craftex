import {
  ActionIcon,
  createStyles,
  Divider,
  Group,
  Loader,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedState, UseListStateHandlers } from "@mantine/hooks";
import { IconCrownOff, IconMinus, IconPlus, IconSearch } from "@tabler/icons";
import { trpc } from "@utils/trpc";
import type { Plugin } from "@utils/types/craftex";
import React, { useEffect, useState } from "react";
import { string } from "zod";
import { ListSectionProps } from "./schemas";

const useStyles = createStyles((theme) => ({
  root: {
    minWidth: "25%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    overflow: "hidden",
    gap: 0,
  },

  nothingFound: {
    paddingTop: theme.spacing.xl * 8,
    userSelect: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: 600,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[4],
  },

  pluginHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ListPluginSearch: React.FC<
  ListSectionProps & { handlers: UseListStateHandlers<Plugin> }
> = ({ form: { errors }, handlers, selected }) => {
  const { classes, theme } = useStyles();
  const [pluginName, setPluginName] = useDebouncedState("", 500);

  const {
    data: filteredPlugins,
    isFetching,
    isSuccess,
  } = trpc.useQuery(
    [
      "plugin.unprotected.filtered",
      {
        filter: pluginName,
      },
    ],
    {
      enabled: string()
        .min(2, "Plugin name must be at least 2 characters long")
        .safeParse(pluginName).success,
    }
  );

  return (
    <Group className={classes.root}>
      <TextInput
        sx={{ width: "100%" }}
        pb={theme.spacing.sm * (errors && errors.listName ? 2.5 : 1)}
        placeholder="Search"
        icon={<IconSearch size={12} stroke={1.5} />}
        onInput={({ currentTarget: { value } }) => setPluginName(value)}
        rightSection={
          isFetching && <Loader size="xs" color={theme.colors.brand[7]} />
        }
      />

      <Group pb={4} sx={{ width: "100%" }}>
        <Divider sx={{ width: "100%" }} />
        <Group className={classes.pluginHeader}>
          <Text size="xs" weight={500} color="dimmed">
            Plugins
          </Text>
          <Text size="xs" color="dimmed">
            {filteredPlugins?.length ?? "No"} results
          </Text>
        </Group>
      </Group>
      {filteredPlugins ? (
        <ScrollArea sx={{ width: "100%" }}>
          {filteredPlugins.map((p) => (
            <PluginShowcase
              handlers={handlers}
              selected={selected}
              plugin={p}
              key={p.id}
            />
          ))}
        </ScrollArea>
      ) : (
        <div className={classes.nothingFound}>
          <IconCrownOff size={theme.fontSizes.xl * 6.5} strokeWidth={1} />
          <Text size="md">Uh oh... nothing found :/</Text>
        </div>
      )}
    </Group>
  );
};

// ----- Showcase start

const useShowcaseStyles = createStyles((theme) => ({
  toggle: {
    padding: 2.5,
    borderRadius: 4,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[3],
  },

  pluginHolder: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    padding: `8px 6px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  title: {
    lineHeight: 0.95,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[4]
        : theme.colors.gray[8],
  },

  titleActive: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.brand[3]
        : theme.colors.brand[6],
  },

  leftSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 0,
  },
}));

const PluginShowcase: React.FC<{
  plugin: Plugin;
  selected: Plugin[];
  handlers: UseListStateHandlers<Plugin>;
}> = ({ plugin, handlers, selected }) => {
  const { classes, cx, theme } = useShowcaseStyles();
  const [isSelected, setIsSelected] = useState(false);

  // probably there's a better way, but my one brain cell isn't enough to figure it out at 1:30am
  useEffect(() => {
    if (selected.some(({ id }) => id === plugin.id)) setIsSelected(true);
  }, [selected]);

  const appendPlugin = (plugin: Plugin) => {
    if (isSelected) return;

    handlers.append(plugin);
    setIsSelected(true);
  };

  const removePlugin: (toRemove: Plugin) => void = ({ id: toRemoveId }) => {
    if (!isSelected) return;

    handlers.filter(({ id }) => id !== toRemoveId);
    setIsSelected(false);
  };

  const togglePlugin = () =>
    isSelected ? removePlugin(plugin) : appendPlugin(plugin);

  return (
    <div className={classes.pluginHolder} onClick={togglePlugin}>
      <Group className={classes.leftSection}>
        <Text
          size="sm"
          className={cx(classes.title, {
            [classes.titleActive]: isSelected,
          })}
        >
          {plugin.title}
        </Text>
        <Text size={11} color="dimmed" sx={{ userSelect: "none" }}>
          by {plugin.developers.find((d) => !!d)?.name ?? "WH OMEGALUL"}{" "}
          {plugin.developers.length > 1 && (
            <span>(+{plugin.developers.length - 1})</span>
          )}
        </Text>
      </Group>
      <ActionIcon
        size="xs"
        onClick={togglePlugin}
        className={classes.toggle}
        sx={(theme) => ({
          color: isSelected
            ? theme.colorScheme === "dark"
              ? theme.colors.orange[6]
              : theme.colors.red[7]
            : theme.colorScheme === "dark"
            ? theme.colors.lime[6]
            : theme.colors.lime[7],
        })}
      >
        {isSelected ? <IconMinus size={16} /> : <IconPlus size={16} />}
      </ActionIcon>
    </div>
  );
};

export default ListPluginSearch;
