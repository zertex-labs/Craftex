import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

import Link from "next/link";
import tw from "tailwind-styled-components";
import OutlineButton from "./buttons/outline";
import TextButton from "./buttons/text";
import UserHolder from "./UserHolder";
import Logo from "/public/logo.svg";
import SearchIcon from "/public/search.svg";

export default function Navigation() {
  const { data: session, status } = useSession();

  return (
    <NavigationStyled>
      <div className="flex flex-grow space-x-4 items-center">
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
            className="w-full pl-1 pr-2 outline-none float-none text-xs bg-transparent"
            maxLength={64}
          />
          <Image
            alt="🔎"
            src={SearchIcon}
            height={16}
            width={16}
            color="#54575b" // gray-700
            className="select-none pointer-events-none"
          />
        </Search>

        <LinksHolder>
          <Link href="/plugin/create" as={CraftexLink}>
            <a>plugin/create</a>
          </Link>
          <Link href="/plugin/all" as={CraftexLink}>
            <a>plugin/all</a>
          </Link>
        </LinksHolder>
      </div>

      <div className="flex space-x-6 items-center">
        <div
          className="bg-transparent rounded-full hover:bg-gray-100 active:bg-gray-200"
          title="Upload a plugin"
        >
          <Link href="/plugin/create">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 p-2 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#26292e"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </a>
          </Link>
        </div>

        <div className="w-px h-8 bg-gray-200"></div>

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

export const NavigationStyled = tw.div`
  flex
  flex-row
  min-w-full
  justify-between
  items-center
  border-b
  border-gray-200

  bg-white

  px-8
  py-3
  mb-4
`;

const Search = tw.div`
  hidden

  sm:flex
  flex-row
  items-center

  border
  border-gray-400
  text-gray-600

  justify-between
  w-1/6

  px-2
  py-1.5

  rounded-lg
  focus-within:border

  focus-within:border-gray-500
  focus-within:text-gray-900
`;

const LinksHolder = tw.ul`
  flex
  flex-row
  items-center
  space-x-4
`;

const CraftexLink = tw.li`
  text-text

  border-b
  border-transparent

  cursor-pointer

  active:border-primary-200
  active:text-primary-200

  hover:text-primary-200
`;

const Unauthenticated = tw.div`
  flex
  flex-row
  items-center
  space-x-2
`;
