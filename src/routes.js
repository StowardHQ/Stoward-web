import { lazy } from "solid-js";
import Home from "./pages/Home";

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/add-server",
    component: lazy(() => import("./pages/AddServer")),
  },
  {
    path: "/server/:sid",
    component: lazy(() => import("./pages/ServerPage")),
  },
  {
    path: "/tag/:tag",
    component: lazy(() => import("./pages/TagPage")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
