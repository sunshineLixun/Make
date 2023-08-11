import { createBrowserRouter } from "react-router-dom";
import Home from "@r/views/home";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);
