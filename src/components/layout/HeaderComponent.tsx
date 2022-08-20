import ActionToggle from "@components/ActionToggle";
import CraftexLogo from "@components/CraftexLogo";
import {
  Burger,
  Button,
  Center,
  ColorSwatch,
  Container,
  createStyles,
  Divider,
  Group,
  Header,
  MantineTheme,
  Menu,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowBarLeft,
  IconMessageCircle,
  IconPhoto,
  IconQuestionMark,
  IconSearch,
  IconSettings,
  IconSun,
  IconMoonStars,
  IconTextDirectionLtr,
  IconTextDirectionRtl,
} from "@tabler/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDirectionContext } from "./DirectionContext";
import type { HeaderLink, LayoutComponentProps } from "./types";

const HEADER_HEIGHT = 56;
const BURGER_HEIGHT = HEADER_HEIGHT / 2;

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
}: LayoutComponentProps & { toggle: () => void }) {
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
            <ActionToggle
              colors={[theme.colors.gray[1], theme.colors.gray[6]]}
              icons={[IconSun, IconMoonStars]}
              onClick={() => toggleColorScheme()}
              shouldToggle={colorScheme === "dark"}
            />
            <ActionToggle
              colors={[theme.colors.gray[1], theme.colors.gray[6]]}
              icons={[IconTextDirectionRtl, IconTextDirectionLtr]}
              onClick={() => toggleDirection()}
              shouldToggle={dir === "ltr"}
            />
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
                      className="rounded-full select-none pointer-events-none"
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
