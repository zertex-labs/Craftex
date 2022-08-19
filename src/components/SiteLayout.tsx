import NavbarComponent from "./NavbarComponent";
import SidebarComponent from "./SidebarComponent";

export const SiteLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex h-screen w-full flex-col overflow-hidden">
    <NavbarComponent />
    <div className="flex h-full overflow-hidden px-1">
      <SidebarComponent />
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  </div>
);
