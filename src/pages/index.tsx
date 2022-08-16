import { CreateBucketCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import OutlineButton from "@components/buttons/outline";
import { s3 } from "@utils/s3";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Craftex</title>
        <meta name="description" content="Craftex TOOD" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-24 py-6">
        <h1 className="font-bold text-3xl">Homepage</h1>
      </div>
    </>
  );
};

export default Home;
