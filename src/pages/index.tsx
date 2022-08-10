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

      {status === "authenticated" && session.user ? (
        <div>
          <h1>
            Welcome {session.user.name} ({session.user.email})
          </h1>
          {typeof session.user.image === "string" && (
            <Image
              key={session.user.id}
              src={session.user.image}
              width={64}
              height={64}
            />
          )}
        </div>
      ) : (
        <div>
          <h1>Bruh, sign in??</h1>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </>
  );
};

export default Home;
