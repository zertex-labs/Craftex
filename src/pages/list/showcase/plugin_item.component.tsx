import { Button, createStyles, Group, Text } from "@mantine/core";
import type { Plugin } from "@utils/types/craftex";
import { useContext } from "react";
import { SearchContext } from "../context";

interface Props {
  plugin: Plugin;
}

const PluginItem: React.FC<Props> = ({ plugin }) => {
  const {
    classes: { root },
  } = useStyles();

  const { removePlugin } = useContext(SearchContext);

  return (
    <Group className={root} noWrap>
      <Text>{plugin.title}</Text>
      <Button
        size="xs"
        variant="outline"
        color="red"
        onClick={() => plugin && removePlugin({ plugin })}
      >
        Remove
      </Button>
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    "&:not(:last-child)": {
      marginBottom: theme.spacing.xs / 2,
    },

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderRadius: `8px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },
}));

export default PluginItem;
