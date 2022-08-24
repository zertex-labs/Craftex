import { env } from "@env/client";
import { AppRouter } from "@server/router";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import type { NextWebVitalsMetric } from "next/dist/shared/lib/utils";
import { event, GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import { ReactQueryDevtools } from "react-query/devtools";
import superjson from "superjson";

import SiteLayout from "@components/layout";
import "@utils/tailwind.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import MantineLayer from "./mantine.component";
import { DndContext } from "@dnd-kit/core";

function App(props: AppProps) {
  usePageViews({ gaMeasurementId: env.NEXT_PUBLIC_GA_ID });

  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <React.Fragment>
      <Head>
        <title>Craftex</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="craftex icon" href="/favicon.svg" />
      </Head>

      <GoogleAnalytics gaMeasurementId={`${env.NEXT_PUBLIC_GA_ID}`} />
      <ReactQueryDevtools initialIsOpen={false} />

      <MantineLayer>
        <SessionProvider session={session}>
          <SiteLayout>
            <DndContext>
              <Component {...pageProps} />
            </DndContext>
          </SiteLayout>
        </SessionProvider>
      </MantineLayer>
    </React.Fragment>
  );
}

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  event(
    name,
    {
      category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
      label: id, // id unique to current page load
      nonInteraction: true, // avoids affecting bounce rate.
    },
    env.NEXT_PUBLIC_GA_ID
  );
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
    };
  },
  ssr: false,
})(App);
