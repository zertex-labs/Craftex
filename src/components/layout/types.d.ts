import { MantineTheme } from "@mantine/core";
import { SetStateAction } from "react";

export type LayoutComponentProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>

  theme: MantineTheme;
};