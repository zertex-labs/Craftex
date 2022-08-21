import {
  ActionIcon,
  Badge,
  Code,
  createStyles,
  Group,
  Navbar,
  ScrollArea,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { IconPlus, IconSearch, IconStar } from "@tabler/icons";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { HEADER_HEIGHT } from "./HeaderComponent";
import { LayoutComponentProps } from "./types";

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
    alignItems: "center",
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

  links: {
    display: "flex",
    flexDirection: "row",
    width: "100%",

    justifyContent: "space-around",
    alignItems: "center",
  },

  link: {
    padding: `8px 10px`,
    borderRadius: theme.radius.md,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const NavbarComponent: React.FC<
  LayoutComponentProps & { close: () => void }
> = ({ opened, links, close }) => {
  const { pathname } = useRouter();

  const { classes, theme, cx } = useStyles();
  const { data: session, status } = useSession();
  const { width } = useViewportSize();

  useEffect(() => {
    if (width <= theme.breakpoints.sm && opened) close();
  }, [width]);

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
        sx={
          opened
            ? {
                borderBottom: `1px solid ${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[3]
                }`,
              }
            : {}
        }
        readOnly
      />

      {opened && (
        <Navbar.Section
          style={{ marginBottom: 0 }}
          py="xs"
          className={classes.section}
        >
          <div className={classes.links}>
            {links.map((link) => (
              <Text
                key={link.link}
                component={NextLink}
                href={link.link}
                className={cx(classes.link, {
                  [classes.linkActive]: pathname === link.link,
                })}
                onClick={() => close()}
              >
                {link.label}
              </Text>
            ))}
          </div>
        </Navbar.Section>
      )}

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
                  {plugin.title}
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
