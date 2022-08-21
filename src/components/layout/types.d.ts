import { MantineTheme } from "@mantine/core";
import { SetStateAction } from "react";

export type LayoutComponentProps = {
  links: NavigationLink[];
  opened: boolean;
};

export type NavigationLink = {
  label: string;
  link: string;
};

