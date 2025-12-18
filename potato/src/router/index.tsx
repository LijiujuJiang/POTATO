import { createBrowserRouter } from "react-router-dom";
import { Hero } from "../components/pages/Hero";
import { Projects } from "../components/pages/Projects";
import ItemOne from "../components/elements/item1";
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
  },{
    path:"/1",
    element: <ItemOne />
  }
]);
export default routers;