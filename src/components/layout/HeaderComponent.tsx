import ActionToggle from "@components/ActionToggle";
import CraftexLogo from "@components/CraftexLogo";
import {
  Burger,
  Button,
  ColorSwatch,
  createStyles,
  Divider,
  Group,
  Header,
  Menu,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import {
  IconArrowBarLeft,
  IconMessageCircle,
  IconMoonStars,
  IconPhoto,
  IconQuestionMark,
  IconSearch,
  IconSettings,
  IconSun,
  IconTextDirectionLtr,
  IconTextDirectionRtl,
} from "@tabler/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useDirectionContext } from "./DirectionContext";
import type { HeaderLink, LayoutComponentProps } from "./types";

export const HEADER_HEIGHT = 56;

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    display: "none",
    [theme.fn.smallerThan("sm")]: {
      display: "block",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "6px 8px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

function HeaderComponent({
  theme,
  opened,
  toggle,
  links,
}: LayoutComponentProps & { toggle: () => void; links: HeaderLink[] }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { dir, toggleDirection } = useDirectionContext();
  const { data: session, status } = useSession();
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <CraftexLogo />
        </Group>

        <Group>
          <Burger
            className={classes.burger}
            opened={opened}
            onClick={toggle}
            size="sm"
          />

          <Group spacing={8} className={classes.links}>
            {links.map((link) => (
              <Text
                component={NextLink}
                href={link.link}
                className={classes.link}
              >
                {link.label}
              </Text>
            ))}
          </Group>

          <Divider orientation="vertical" />

          {status === "authenticated" && session.user ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Button
                    style={{
                      color:
                        colorScheme === "light"
                          ? theme.primaryColor
                          : theme.colors.brand[6],
                      borderColor:
                        colorScheme === "light"
                          ? theme.primaryColor
                          : theme.colors.brand[6],
                    }}
                    px={8}
                    variant="outline"
                    compact
                  >
                    {session.user.name}
                  </Button>

                  {session.user.image &&
                  typeof session.user?.image === "string" ? (
                    <Image
                      key={session.user.id}
                      alt={`${session.user.name}'s profile picture`}
                      src={session.user.image}
                      width={32}
                      height={32}
                      style={{
                        borderRadius: "9999px",
                        userSelect: "none",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <ColorSwatch
                      component="button"
                      color={theme.colors.brand[5]}
                      p={16}
                      sx={{ color: theme.colors.brand[6], border: "none" }}
                    >
                      <IconQuestionMark />
                    </ColorSwatch>
                  )}
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                <Group
                  p={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <ActionToggle
                    colors={[theme.colors.gray[1], theme.colors.gray[6]]}
                    icons={[IconSun, IconMoonStars]}
                    onClick={() => toggleColorScheme()}
                    shouldToggle={colorScheme === "dark"}
                  />

                  <Divider orientation="vertical" />

                  <ActionToggle
                    colors={[theme.colors.gray[1], theme.colors.gray[6]]}
                    icons={[IconTextDirectionRtl, IconTextDirectionLtr]}
                    onClick={() => toggleDirection()}
                    shouldToggle={dir === "ltr"}
                  />
                </Group>

                <Menu.Divider />

                <Menu.Label>Application</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>
                <Menu.Item icon={<IconMessageCircle size={14} />}>
                  Messages
                </Menu.Item>
                <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                <Menu.Item
                  icon={<IconSearch size={14} />}
                  rightSection={
                    <Text size="xs" color="dimmed">
                      ⌘K
                    </Text>
                  }
                >
                  Search
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                  icon={<IconArrowBarLeft size={14} />}
                  onClick={() => signOut()}
                >
                  Sign out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button variant="outline" size="xs" onClick={() => signIn()}>
              Join
            </Button>
          )}
        </Group>
      </div>
    </Header>
  );
}

export default React.memo(HeaderComponent);
