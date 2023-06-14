"use client";

import { usePathname } from "next/navigation";

import { useMemo } from "react";
import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";

import SidebarSectionTop from "./sidebar/SidebarSectionTop";
import SidebarSectionBottom from "./sidebar/SidebarSectionBottom";
import { useUser } from "@/hooks/useUser";

export interface SidebarProps {
  children: React.ReactNode;
}

export interface SidebarRoute {
  icon: IconType;
  label: string;
  isActive: boolean;
  href: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children: childen }) => {
  "use client";

  const pathname = usePathname();
  const userCtx = useUser();

  const routes = useMemo<SidebarRoute[]>(
    () => [
      {
        label: "Home",
        icon: AiOutlineHome,
        href: "/",
        isActive: pathname === "/",
      },
      {
        label: "Dashboard",
        icon: RiDashboardLine,
        href: "/dashboard",
        isActive: pathname === "/dashboard",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full text-gray-200">
      <div className="flex flex-col gap-y-2 h-full w-[325px] p-2">
        <SidebarSectionTop userContext={userCtx} routes={routes} />
        <SidebarSectionBottom userContext={userCtx} />
      </div>
      <main className="flex-1 h-full py-2 overflow-y-auto">{childen}</main>
    </div>
  );
};

export default Sidebar;
