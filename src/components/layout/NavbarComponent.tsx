import { createStyles, Navbar } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { LayoutComponentProps, NavbarLink } from "./types";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,

        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const NavbarComponent: React.FC<
  LayoutComponentProps & { links: NavbarLink[]; close: () => void }
> = ({ opened, close, links: rawLinks }) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = rawLinks.map((item) => (
    <Link href={item.link} key={item.label}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active,
        })}
        onClick={(event) => {
          setActive(item.label);
          close();
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    </Link>
  ));

  return (
    <Navbar
      height={700}
      p="sm"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 225, lg: 250 }}
    >
      <Navbar.Section grow>{links}</Navbar.Section>
    </Navbar>
  );
};

export default React.memo(NavbarComponent);
