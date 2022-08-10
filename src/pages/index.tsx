import { Button } from "@styles/buttons";
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

      <Button>Demo Button</Button>

      {status === "authenticated" && session.user ? (
        <div>
          <h1>
            Welcome {session.user.name} ({session.user.email})
          </h1>
          <button onClick={() => signOut()}>Sign out</button>
          {typeof session.user.image === "string" && (
            <Image
              key={session.user.id}
              alt={`${session.user.name}'s profile picture`}
              src={session.user.image}
              width={64}
              height={64}
            />
          )}
        </div>
      ) : (
        <>
          <h1>Bruh, sign in??</h1>
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </>
  );
};

export default Home;
