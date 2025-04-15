import { useState } from "react";
import { darkTheme, lightTheme } from "./styles/theme";
import { ThemeProvider } from "@emotion/react";
import AppRoutes from "./routes";

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme,
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <AppRoutes toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

export default App;
