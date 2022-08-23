import { ClassNames } from "@emotion/react";
import { createStyles, Divider } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ERROR_MESSAGES: string[] = [
  "Uhh... where we goin'?",
  "Where are we?",
  "Page not found",
  "Found not page",
  "???",
  "Uhhh... this is awkward",
  "These are uncharted waters",
  "Something smells fishy here...",
  "Something's wrong here",
  "Something blew up :/",
  "Whoops! That page doesn't exist",
  "In case you haven't noticed, you've fallen right into my trap",
  "Wow! Great page idea, unfortunately it doesn't exist",
  "We don't know the crafting recipe for this page",
];

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
  },

  title: {
    fontSize: theme.fontSizes.xl * 2.35,
    fontWeight: 900,
    px: theme.spacing.xl,
  },

  divider: {
    height: theme.spacing.xl * 4,
    width: "1px",

    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[4],
  },

  rightSectionRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "50vh",

    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
  },

  errorMessage: {
    fontSize: theme.fontSizes.lg,
    lineHeight: "24px",
    paddingBottom: theme.spacing.xs * 0.6,
  },

  backMessage: {
    fontSize: theme.fontSizes.xs,

    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
}));

export default function Custom404() {
  const [errorMessage, setErrorMessage] = useState("");
  const { classes, theme } = useStyles();

  useEffect(
    () =>
      setErrorMessage(
        ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]!
      ),
    []
  );

  return (
    <React.Fragment>
      <Head>
        <title>Craftex - 404</title>
        <meta name="description" content="Craftex TOOD" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.root}>
        <h1 className={classes.title}>404</h1>
        <div className={classes.divider}></div>
        <div className={classes.rightSectionRoot}>
          <p className={classes.errorMessage}>{errorMessage}</p>
          <Link href="/">
            <a className={classes.backMessage}>Go back?</a>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
