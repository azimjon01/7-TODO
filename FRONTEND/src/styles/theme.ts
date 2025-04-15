export const lightTheme = {
  mode: "light",
  colors: {
    primary: "green",
    secondary: "red",
    background: "#fff",
    text: "#000",
  },
  fonts: {
    base: "'Inter',sans-serif",
    heading: "'Poppins',sans-serif",
  },
  borders: {
    border: "1px solid #e5e7e7",
  },
  sizes: {
    size: "16px",
  },
  borderradius: {
    radius: "30px",
  },
  calcs: {
    calc: "40px",
  },
};

export const darkTheme = {
  mode: "dark",
  colors: {
    primary: "green",
    secondary: "red",
    background: "#000",
    text: "#fff",
  },
  fonts: {
    base: "'Inter',sans-serif",
    heading: "'Poppins',sans-serif",
  },
  borders: {
    border: "1px solid #e5e7e7",
  },
  sizes: {
    size: "16px",
  },
  borderradius: {
    radius: "30px",
  },
  calcs: {
    calc: "40px",
  },
};

export type ThemeType = typeof lightTheme;
