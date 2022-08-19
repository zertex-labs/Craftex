import { Dropdown, Navbar } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
import OutlineButton from "./buttons/OutlineButton";
import ResourceCreateDropdown from "./ResourceCreateDropdown";

function NavbarComponent() {
  const { data: session, status } = useSession();

  return (
    <div className="border-b border-gray-100">
      <Navbar fluid={true} rounded={true} aria-label="Navigation Bar">
        <Link href="/" shallow={true}>
          <a className="flex">
            <Image
              alt="logo"
              src="https://cdn.craftex.dev/brand/logo"
              height={32}
              width={22}
              className="mr-3 h-6 sm:h-9 select-none pointer-events-none"
            />

            <span className="pl-2 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Craftex
            </span>
          </a>
        </Link>

        <Navbar.Toggle />

        <div className="flex md:order-2">
          {status === "authenticated" && session.user ? (
            <div className="flex items-center gap-1">
              <ResourceCreateDropdown />

              <div className="w-1 h-full border-l p-1 border-gray-100"></div>

              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  session.user.image &&
                  typeof session.user?.image === "string" ? (
                    <Image
                      key={session.user.id}
                      alt={`${session.user.name}'s profile picture`}
                      src={session.user.image}
                      width={32}
                      height={32}
                      className="rounded-full select-none pointer-events-none"
                    />
                  ) : (
                    <div className="h-8 w-8 p-1 bg-primary-200 rounded-full">
                      <BiChevronDown className="text-3xl text-text-light" />
                    </div>
                  )
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{session.user.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {session.user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => signOut()}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <OutlineButton text="Join" onClick={() => signIn()} />
          )}
        </div>

        <Navbar.Collapse>
          <NavbarLink href="/plugin/create" title="@plugin/create" />
          <NavbarLink href="/plugin/all" title="@plugin/all" />
          <NavbarLink href="/list/create" title="@list/create" />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

const NavbarLink: React.FC<{ href: string; title: string }> = ({
  href,
  title,
}) => {
  const { pathname } = useRouter();

  return (
    <Link href={href}>
      <a className={`${pathname === href ? "text-primary-200" : ""} `}>
        {title}
      </a>
    </Link>
  );
};

export default React.memo(NavbarComponent);
