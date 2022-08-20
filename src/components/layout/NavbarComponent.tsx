import { Navbar, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";
import { LayoutComponentProps } from "./types";

const NavbarComponent: React.FC<LayoutComponentProps> = ({
  opened,
  setOpened,
  theme,
}) => {
  const { data: session, status } = useSession();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 50, lg: 250 }}
    >
      <Text>Application navbar</Text>
    </Navbar>
  );
};

export default React.memo(NavbarComponent);
