import { createBrowserRouter } from "react-router-dom";
import { Hero } from "../components/pages/Hero";
import { Projects } from "../components/pages/Projects";
import { BigView } from "../components/pages/BigView";
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
    element: <BigView />
  }
]);
export default routers;