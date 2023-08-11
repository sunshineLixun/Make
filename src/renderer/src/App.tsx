import { RouterProvider } from "react-router-dom";
import router from "@r/routers";

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
