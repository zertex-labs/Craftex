import { Theme } from "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      primary: string;
    };
  }
}

const CraftexTheme: Theme = {
  color: {
    primary: "#3F7CD4",
  },
};

export default CraftexTheme;

// lmao
interface Breakpoints {
  sm: "360px";
  md: "768px";
  lg: "1024px";
  xl: "1280px";
  xxl: "1600px";
}

export const breakpoints: Breakpoints = {
  sm: "360px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1600px",
};
