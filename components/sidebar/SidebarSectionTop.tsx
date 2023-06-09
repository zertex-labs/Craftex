import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { twMerge } from "tailwind-merge";

import { UserContextType } from "@/hooks/useUser";
import Container from "../Container";
import { SidebarRoute } from "../Sidebar";
import UserImage from "../user/UserImage";

export interface SidebarSectionTopProps {
  routes: SidebarRoute[];
  userContext: UserContextType;
}
const SidebarSectionTop: React.FC<SidebarSectionTopProps> = ({
  routes,
  userContext: { userDetails },
}) => {
  return (
    <Container>
      {userDetails?.full_name && (
        <div className="border-l-neutral-400">
          <div className="flex items-center justify-between w-full h-20 px-5 border-b-2 rounded-t-lg border-neutral-800/75">
            <div className="flex gap-x-2 items-center">
              <UserImage details={userDetails} />
              <p className="text-sm truncate font-bold">
                {userDetails.full_name}
              </p>
            </div>
            <CiLogout />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-y-4">
        {routes.map(({ href, icon: Icon, isActive, label }) => (
          <Link
            key={label}
            href={href}
            className={twMerge(
              `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
              isActive && "text-sky-300"
            )}
          >
            <Icon size={26} />
            <p className="truncate w-100">{label}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default SidebarSectionTop;
