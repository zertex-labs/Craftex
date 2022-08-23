import { HEADER_HEIGHT } from "@components/layout/HeaderComponent";
import {
  ActionIcon,
  createStyles,
  Grid,
  Group,
  Loader,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedState, UseListStateHandlers } from "@mantine/hooks";
import { IconAmbulance, IconMinus, IconPlus, IconSearch } from "@tabler/icons";
import { trpc } from "@utils/trpc";
import type { Plugin } from "@utils/types/craftex";
import { useEffect, useState } from "react";
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
        : theme.colors.gray[4],
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
        rightSection={
          isFetching && <Loader size="xs" color={theme.colors.brand[7]} />
        }
        {...getInputProps("pluginName")}
      />

      {filteredPlugins && isSuccess && (
        <Group
          px={2}
          pt="xs"
          pb={5}
          position="apart"
          sx={{
            borderTop: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
            }`,
          }}
        >
          <Text size="xs" weight={500} color="dimmed">
            Plugins
          </Text>
          <Text size="xs" color="dimmed">
            {filteredPlugins.length} results
          </Text>
        </Group>
      )}
      <ScrollArea.Autosize maxHeight={`calc(98% - ${theme.spacing.xl}px)`}>
        {filteredPlugins ? (
          filteredPlugins.map((p) => (
            <PluginShowcase
              selected={selected}
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
    <div
      key={plugin.id}
      className={classes.pluginHolder}
      onClick={togglePlugin}
    >
      <Group className={classes.leftSection}>
        <Text
          // component={NextLink}
          // href={`/plugin/view/${plugin.id}`}
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
