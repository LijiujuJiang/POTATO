import { createBrowserRouter } from "react-router-dom";
import { Hero } from "../components/pages/Hero";
import { Projects } from "../components/pages/Projects";
const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Hero />
      </div>
    ),
    errorElement: <p>404 !</p>,
    }, {
        path: "/projects",
        element: <Projects />
  }
]);
export default routers;