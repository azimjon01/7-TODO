import "@emotion/react";
// import { ThemeType } from "./styles/theme";

// declare module "@emotion/react" {
//   export interface Theme extends ThemeType {}
// }

declare module "@emotion/react" {
  export interface Theme {
    mode: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    fonts: {
      base: string;
      heading: string;
    };
    borders: {
      border: string;
    };
    sizes: {
      size: string;
    };
    borderradius: {
      radius: string;
    };
    calcs: {
      calc: string;
    };
  }
}
