import { HEADER_HEIGHT } from "@components/layout/HeaderComponent";
import {
  createStyles,
  Divider,
  Group,
  Loader,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedState, UseListStateHandlers } from "@mantine/hooks";
import { IconCrownOff, IconSearch } from "@tabler/icons";
import { trpc } from "@utils/trpc";
import type { Plugin } from "@utils/types/craftex";
import React, { useState } from "react";
import { string } from "zod";
import { SearchContext } from "../context";
import { ListSectionProps } from "../schemas";
import PluginShowcase from "./plugin_showcase.component";

export const SEARCH_COMPONENT_WIDTH = 300;

const useStyles = createStyles((theme) => ({
  root: {
    zIndex: 1,
    position: "fixed",
    top: HEADER_HEIGHT + theme.spacing.md,
    right: theme.spacing.md,

    width: SEARCH_COMPONENT_WIDTH,
    height: "calc(100vh - 56px - 32px)",
    display: "flex",
    flexDirection: "column",
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

const ListPluginSearch: React.FC<ListSectionProps> = ({
  selected,
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
      enabled: string()
        .min(2, "Plugin name must be at least 2 characters long")
        .safeParse(pluginName).success,
    }
  );

  return (
    <Group className={classes.root}>
      <TextInput
        sx={{ width: "100%" }}
        pb={theme.spacing.sm}
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
            <PluginShowcase plugin={p} key={p.id} selected={selected} />
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

export default ListPluginSearch;
