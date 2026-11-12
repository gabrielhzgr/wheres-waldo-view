import { createBrowserRouter } from "react-router";
import ErrorPage from "./Routes/ErrorPage/ErrorPage.jsx";
import Home from "./Routes/Home/Home.jsx";
import Level from "./Components/Level/Level.jsx";
import LevelProvider from "./Providers/LevelProvider.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LevelProvider>
        <Home />
      </LevelProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "play",
    element: (
      <LevelProvider>
        <Level />
      </LevelProvider>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
