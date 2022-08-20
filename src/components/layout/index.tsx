import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import HeaderComponent from "./HeaderComponent";
import NavbarComponent from "./NavbarComponent";

const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

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
        <NavbarComponent theme={theme} opened={opened} setOpened={setOpened} />
      }
      header={
        <HeaderComponent theme={theme} opened={opened} setOpened={setOpened} />
      }
    >
      {children}
    </AppShell>
  );
};

export default SiteLayout;
