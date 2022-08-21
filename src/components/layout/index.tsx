import { AppShell, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconHome,
  IconCodePlus,
  IconCode,
  IconClipboardList,
} from "@tabler/icons";
import HeaderComponent from "./HeaderComponent";
import NavbarComponent from "./NavbarComponent";
import { NavigationLink } from "./types";

const links: NavigationLink[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/plugin/create",
    label: "@plugin/create",
  },
  {
    link: "/plugin/all",
    label: "@plugin/all",
  },
  {
    link: "/list/create",
    label: "@list/create",
  },
];

const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarComponent links={links} opened={opened} close={close} />}
      header={<HeaderComponent links={links} opened={opened} toggle={toggle} />}
    >
      {children}
    </AppShell>
  );
};

export default SiteLayout;
