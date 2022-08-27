import { HEADER_HEIGHT } from "@components/layout/HeaderComponent";
import {
  createStyles,
  Divider,
  Group,
  MantineTheme,
  ScrollArea,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconPencil } from "@tabler/icons";
import React, { ReactNode, useEffect } from "react";
import { ListCreateFormProps } from "../create.page";
import { ListSectionProps } from "../schemas";
import { SEARCH_COMPONENT_WIDTH } from "../search";
import PluginItem from "./plugin_item.component";

const ListShowcase: React.FC<
  ListSectionProps & { form: UseFormReturnType<ListCreateFormProps> }
> = ({ selected, form: { getInputProps, values, errors } }) => {
  const {
    classes: { header, pluginItems, root, submitButton },
    theme,
  } = useStyles();

  return (
    <Group className={root}>
      <Group px={theme.spacing.xl} pb={theme.spacing.sm} className={header}>
        <Text
          sx={{ maxWidth: "80%", wordBreak: "break-all" }}
          size="xl"
          weight={900}
        >
          {(values.listName.trim().length >= 8 && values.listName) ||
            "My awesome list"}
        </Text>

        <UnstyledButton type="submit" className={submitButton}>
          Create
        </UnstyledButton>
      </Group>

      <ShowcaseSection theme={theme}>
        <Text size="lg" weight={600}>
          List Title
        </Text>
        <TextInput
          placeholder="My awesome list!"
          maxLength={64}
          pb={theme.spacing.md}
          icon={<IconPencil size={12} />}
          {...getInputProps("listName")}
        />
      </ShowcaseSection>

      <ShowcaseSection theme={theme}>
        <Group pb={theme.spacing.xs / 2} position="apart">
          <Text size="lg" weight={600}>
            Active Plugins
          </Text>
          <Text color="dimmed" size="sm" component="span">
            ({selected.length})
          </Text>
        </Group>

        <ScrollArea className={pluginItems}>
          {selected && selected.map((plugin) => <PluginItem plugin={plugin} />)}
        </ScrollArea>
      </ShowcaseSection>
    </Group>
  );
};

const ShowcaseSection: React.FC<{
  theme: MantineTheme;
  children: ReactNode;
  divider?: boolean;
}> = ({ children, theme, divider = true }) => (
  <React.Fragment>
    {divider && <Divider sx={{ width: "100%" }} />}

    <Group
      pt={theme.spacing.md}
      sx={{ width: "100%", height: "100%", display: "block" }}
    >
      {children}
    </Group>
  </React.Fragment>
);

const useStyles = createStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${theme.spacing.md * 2}px)`,
    width: `calc(100% - ${SEARCH_COMPONENT_WIDTH}px - ${theme.spacing.md}px)`,
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    paddingRight: theme.spacing.md,
    display: "block",
  },

  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  submitButton: {
    fontWeight: 900,
    borderRadius: theme.spacing.xs / 2,
    padding: `8px ${theme.spacing.sm}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },

  pluginItems: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));

export default ListShowcase;
