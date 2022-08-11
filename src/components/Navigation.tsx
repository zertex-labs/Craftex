import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

import Link from "next/link";
import tw from "tailwind-styled-components";
import OutlineButton from "./buttons/outline";
import UserHolder from "./UserHolder";
import Logo from "/public/logo.svg";
import SearchIcon from "/public/search.svg";

export const NavigationStyled = tw.div`
  flex
  flex-row
  min-w-full
  justify-between
  items-center
  border-b-2
  border-gray-medium

  px-8
  py-3
`;

const Search = tw.div`
  hidden

  lg:flex
  flex-row
  items-center

  border
  border-gray-medium
  text-gray-medium

  justify-between
  w-6/12

  px-2
  py-2
  text-sm

  rounded-lg
  focus-within:border
  focus-within:border-gray-dark
  focus-within:text-gray-dark
`;

const LinksHolder = tw.ul`
  flex
  flex-row
  items-center
  space-x-4
`;

const CraftexLink = tw.li`
  text-gray-dark
  active:text-primary

  border-b
  border-transparent

  cursor-pointer

  active:border-primary
`;

const Unauthenticated = tw.div`
  flex
  flex-row
  items-center
  space-x-2
`;

export default function Navigation() {
  const { data: session, status } = useSession();

  return (
    <NavigationStyled>
      <div className="flex flex-grow space-x-12">
        <Link href="/">
          <a>
            <Image
              alt="logo"
              src={Logo}
              height={32}
              width={22}
              className="w-1/12 select-none pointer-events-none"
            />
          </a>
        </Link>

        <Search>
          <input
            type="text"
            placeholder="What are we building today?"
            className="w-full pl-1 pr-2 outline-none float-none "
            maxLength={64}
          />
          <Image
            alt="🔎"
            src={SearchIcon}
            className="select-none pointer-events-none"
          />
        </Search>
      </div>

      <div className="flex space-x-6">
        <LinksHolder>
          <CraftexLink>Link #1</CraftexLink>
          <CraftexLink>Link #2</CraftexLink>
          <CraftexLink>Link #3</CraftexLink>
          <CraftexLink>Link #4</CraftexLink>
        </LinksHolder>

        <div className="w-px bg-gray-medium"></div>

        {status === "authenticated" && session.user ? (
          <UserHolder user={session.user} />
        ) : (
          <Unauthenticated>
            <OutlineButton title="Join" onClick={() => signIn()} />
          </Unauthenticated>
        )}
      </div>
    </NavigationStyled>
  );
}
