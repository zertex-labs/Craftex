import { HEADER_HEIGHT } from "@components/layout/HeaderComponent";
import {
  createStyles,
  Grid,
  MantineTheme,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import {
  useDebouncedState,
  useDisclosure,
  UseListStateHandlers,
} from "@mantine/hooks";
import { IconAmbulance, IconSearch } from "@tabler/icons";
import { trpc } from "@utils/trpc";
import type { Plugin } from "@utils/types/craftex";
import { useEffect } from "react";
import { ListSectionProps, PluginNameSchema } from "./_schemas";

const useStyles = createStyles((theme) => ({
  root: {
    height: `calc(100vh - ${HEADER_HEIGHT}px - ${theme.spacing.md}px)`,
  },

  nothingFound: {
    paddingTop: theme.spacing.xl * 1.5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    fontWeight: 600,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[7]
        : theme.colors.dark[0],
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
  form: { getInputProps, setFieldError, removeListItem, insertListItem },
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
        {filteredPlugins ? (
          filteredPlugins.map((p) => (
            <PluginShowcase
              selected={selected}
              theme={theme}
              key={p.id}
              plugin={p}
              handlers={handlers}
            />
          ))
        ) : (
          <div className={classes.nothingFound}>
            <IconAmbulance size={90} strokeWidth={1} />
            <span>Uh oh... nothing found :/</span>
          </div>
        )}
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
