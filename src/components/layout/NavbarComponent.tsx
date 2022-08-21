import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  ScrollArea,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
  IconSelector,
  IconStar,
} from "@tabler/icons";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { HEADER_HEIGHT } from "./HeaderComponent";
import { LayoutComponentProps, NavbarLink } from "./types";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
    height: `calc(100% - ${HEADER_HEIGHT}px)`,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  plugins: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  pluginStars: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[6]
        : theme.colors.orange[5],
    gap: 0,
  },

  pluginHolder: {
    display: "flex",
    justifyContent: "space-between",
    padding: `8px ${theme.spacing.xs}px`,
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
}));

const NavbarComponent: React.FC<
  LayoutComponentProps & { close: () => void }
> = ({ close, opened, theme }) => {
  const { classes } = useStyles();
  const { data: session, status } = useSession();

  const { data: plugins } = trpc.useQuery(
    ["plugin.unprotected.byUser", { userId: session?.user!.id ?? "" }],
    {
      enabled: !!session?.user?.id && status === "authenticated",
    }
  );

  return (
    <Navbar
      width={{ sm: 225, lg: 250 }}
      p="sm"
      hiddenBreakpoint="sm"
      hidden={!opened}
      className={classes.navbar}
    >
      <TextInput
        placeholder="Search"
        size="xs"
        icon={<IconSearch size={12} stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        pb="xs"
        sx={{
          borderBottom: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[3]
          }`,
        }}
        readOnly
      />

      <Group px={2} pt="xs" pb={5} position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Plugins
        </Text>
        <Tooltip label="Upload Plugin" withArrow position="right">
          <ActionIcon
            component={NextLink}
            href="/plugin/create"
            variant="default"
            size={18}
          >
            <IconPlus size={12} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Navbar.Section grow component={ScrollArea} className={classes.section}>
        <div className={classes.plugins}>
          {plugins &&
            plugins.map((plugin) => (
              <Link key={plugin.id} href={`/plugin/view/${plugin.id}`}>
                <a className={classes.pluginHolder}>
                  {plugin.title}{" "}
                  <Badge
                    p={6}
                    leftSection={
                      <IconStar
                        size={10}
                        fill={
                          theme.colorScheme === "dark"
                            ? theme.colors.yellow[6]
                            : theme.colors.orange[5]
                        }
                      />
                    }
                    className={classes.pluginStars}
                  >
                    {plugin.stars}
                  </Badge>
                </a>
              </Link>
            ))}
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default React.memo(NavbarComponent);
