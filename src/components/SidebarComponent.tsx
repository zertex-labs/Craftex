import { Sidebar, TextInput } from "flowbite-react";
import React from "react";
import { AiFillCodeSandboxCircle, AiOutlineSearch } from "react-icons/ai";

const SidebarComponent = () => (
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

export default React.memo(SidebarComponent);
