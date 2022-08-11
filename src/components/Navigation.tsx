import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "./Button";
import styled from "styled-components";

import Logo from "/public/logo.svg";
import SearchIcon from "/public/search.svg";

const Search = styled.div``;

const LinksHolder = styled.ul``;

const Link = styled.li``;

export const NavigationStyled = styled.div``;

export default function Navigation() {
  const { data: session, status } = useSession();

  return (
    <NavigationStyled>
      <Image alt="logo" src={Logo} height={41} width={32} />
      <Search>
        <p>What are we building today?</p>
        <Image alt="🔎" src={SearchIcon} />
      </Search>
      <LinksHolder>
        <Link>Link #1</Link>
        <Link>Link #2</Link>
        <Link>Link #3</Link>
        <Link>Link #4</Link>
      </LinksHolder>
      {status === "authenticated" && session.user ? (
        <>
          {typeof session.user.image === "string" && (
            <Image
              key={session.user.id}
              alt={`${session.user.name}'s profile picture`}
              src={session.user.image}
              width={64}
              height={64}
            />
          )}
          <p>{session.user.name}</p>
          <Button
            onClick={() => signOut()}
            theme={{ color: { primary: "red" } }}
          >
            Sign Out (temporary)
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => signIn()}>Sign in</Button>
          <Button
            onClick={() => signOut()}
            theme={{ color: { primary: "red" } }}
          >
            Sign Out
          </Button>
        </>
      )}
    </NavigationStyled>
  );
}
