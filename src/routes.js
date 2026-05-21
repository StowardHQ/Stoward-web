import { lazy } from "solid-js";

import Home from "./pages/Home";
import AddServer from "./pages/AddServer";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/add-server",
    component: AddServer,
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
