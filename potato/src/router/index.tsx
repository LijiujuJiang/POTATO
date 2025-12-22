import { createBrowserRouter } from "react-router-dom";
import { Hero } from "../components/pages/Hero";
import { Projects } from "../components/pages/Projects";
import { BigView } from "../components/pages/BigView";
import { Wonder } from "../components/pages/Wonder";
import { Single } from "../components/pages/Single";
import { Shed } from "../components/pages/Shed";
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
  },{
    path:"/2",
    element: <Single />
  },{
    path:"/3",
    element: <Wonder />
  },{
    path:"/4",
    element: <Shed />
  }
]);
export default routers;