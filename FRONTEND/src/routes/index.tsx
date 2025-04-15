import { Global } from "@emotion/react";
import GlobalStyles from "../styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "../components/TodoList";

const ROUTES_CONFIG = (toggleTheme: () => void) => [
  {
    path: "/",
    element: <TodoList toggleTheme={toggleTheme} />,
  },
];

type AppRoutesProps = {
  toggleTheme: () => void;
};

const AppRoutes = ({ toggleTheme }: AppRoutesProps) => {
  return (
    <>
      <Global styles={GlobalStyles} />
      <BrowserRouter>
        <Routes>
          {ROUTES_CONFIG(toggleTheme).map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
