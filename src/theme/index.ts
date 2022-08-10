import { Theme } from "@emotion/react";
import { Color, hex } from "../styles";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      primary: Color;
    };
  }
}

const CraftexTheme: Theme = {
  color: {
    primary: hex("#3F7CD4"),
  },
};

export default CraftexTheme;
