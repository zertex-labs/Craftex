import { Burger, Header, MediaQuery, Text } from "@mantine/core";
import React from "react";
import { LayoutComponentProps } from "./types";

const HeaderComponent: React.FC<LayoutComponentProps> = ({
  theme,
  opened,
  setOpened,
}) => {
  return (
    <Header height={70} p="md">
      <div className="flex justify-between h-full items-center">
        <Text>Application header</Text>

        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: boolean) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
      </div>
    </Header>
  );
};

export default React.memo(HeaderComponent);
