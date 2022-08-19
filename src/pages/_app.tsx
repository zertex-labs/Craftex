import { env } from "@env/client";
import { AppRouter } from "@server/router";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import type { AppType, NextWebVitalsMetric } from "next/dist/shared/lib/utils";
import { event, GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import { ReactQueryDevtools } from "react-query/devtools";
import superjson from "superjson";

import { SiteLayout } from "@components/SiteLayout";
import "@utils/tailwind.css";
import React from "react";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  usePageViews({ gaMeasurementId: env.NEXT_PUBLIC_GA_ID });

  return (
    <React.Fragment>
      <GoogleAnalytics gaMeasurementId={`${env.NEXT_PUBLIC_GA_ID}`} />
      <ReactQueryDevtools initialIsOpen={false} />

      <SessionProvider session={session}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </SessionProvider>
    </React.Fragment>
  );
};

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
})(MyApp);
