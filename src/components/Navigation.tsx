import { Dropdown, Navbar, Sidebar, TextInput, Tooltip } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiFillCodeSandboxCircle, AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import OutlineButton from "./buttons/OutlineButton";
import ResourceCreateDropdown from "./PluginCreateIcon";

export function NavbarComponent() {
  const { data: session, status } = useSession();

  return (
    <div className="border-b border-gray-100">
      <Navbar fluid={true} rounded={true} aria-label="Navigation Bar">
        <Navbar.Brand href="/">
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
        </Navbar.Brand>
        
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
          <Navbar.Link href="/navbars" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars">About</Navbar.Link>
          <Navbar.Link href="/navbars">Services</Navbar.Link>
          <Navbar.Link href="/navbars">Pricing</Navbar.Link>
          <Navbar.Link href="/navbars">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export const SidebarComponent = () => (
  <div className="flex h-full overflow-hidden bg-white pt-0.5">
    <Sidebar aria-label="Sidebar">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <TextInput
            placeholder="What we building today?"
            type="text"
            sizing="sm"
            icon={AiOutlineSearch}
          />
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={AiFillCodeSandboxCircle}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={AiFillCodeSandboxCircle}>
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={AiFillCodeSandboxCircle}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={AiFillCodeSandboxCircle}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={AiFillCodeSandboxCircle}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={AiFillCodeSandboxCircle}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={AiFillCodeSandboxCircle}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  </div>
);
