import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <React.Fragment>
      <Head>
        <title>Craftex</title>
        <meta name="description" content="Craftex TOOD" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="font-bold text-3xl">Homepage</h1>
    </React.Fragment>
  );
};

export default Home;
