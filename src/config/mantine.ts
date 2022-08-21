import { Tuple, DefaultMantineColor } from "@mantine/core";

export const CustomColors: Record<string, Tuple<string, 10>> = {
  brand: [
    "#d9fffc",
    "#aefdf4",
    "#80faeb",
    "#50f7e3",
    "#23f5da",
    "#0adcc1", // primary
    "#00ab96",
    "#007b6b",
    "#004a40",
    "#001a15",
  ],
};

type ExtendedCustomColors = "brand" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}
