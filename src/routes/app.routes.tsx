import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "@/pages/home/home.tsx";
import News from "@/pages/news/news.tsx";
import Event from "@/pages/event/event.tsx";

export default function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<Home />} path={"/"} />
      <Route element={<News />} path={"/news"} />
      <Route element={<Event />} path={"/community"} />
    </Routes>
  );
}
