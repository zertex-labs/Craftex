import { ActionIcon, createStyles, Group, Text } from "@mantine/core";
import type { Plugin } from "@utils/types/craftex";
import { UseListStateHandlers } from "@mantine/hooks";
import { IconMinus, IconPlus } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context";

const useStyles = createStyles((theme) => ({
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
}> = ({ plugin, selected }) => {
  const { classes, cx, theme } = useStyles();
  const [isSelected, setIsSelected] = useState(false);
  const { appendPlugin, removePlugin } = useContext(SearchContext);

  // probably there's a better way, but my one brain cell isn't enough to figure it out at 1:30am
  useEffect(() => {
    console.log(selected);

    setIsSelected(selected.some(({ id }) => id === plugin.id));
  }, [selected]); // forces ALL items to re-render when a plugin is added/removed, monkaW

  const togglePlugin = () => {
    isSelected ? removePlugin({ plugin }) : appendPlugin({ plugin });

    setIsSelected(!isSelected);
  };

  return (
    <div className={classes.pluginHolder} onClick={() => togglePlugin()}>
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
        onClick={() => togglePlugin()}
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

export default PluginShowcase;
