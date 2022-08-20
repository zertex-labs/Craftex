import { MantineTheme } from "@mantine/core";
import { SetStateAction } from "react";

export type LayoutComponentProps = {
  theme: MantineTheme;
  
  opened: boolean;
};
export type HeaderLink = {
  label: string;
  link: string;
};

export type NavbarLink = HeaderLink & {
  icon: TablerIcon;
};
