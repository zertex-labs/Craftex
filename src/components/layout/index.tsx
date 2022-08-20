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
      navbar={
        <NavbarComponent
          links={[
            {
              link: "/",
              label: "Home",
              icon: IconHome,
            },
            {
              link: "/plugin/create",
              label: "@plugin/create",
              icon: IconCodePlus,
            },
            {
              link: "/plugin/all",
              label: "@plugin/all",
              icon: IconCode,
            },
            {
              link: "/list/create",
              label: "@list/create",
              icon: IconClipboardList,
            },
          ]}
          theme={theme}
          opened={opened}
          close={close}
        />
      }
      header={<HeaderComponent theme={theme} opened={opened} toggle={toggle} />}
    >
      {children}
    </AppShell>
  );
};

export default SiteLayout;
