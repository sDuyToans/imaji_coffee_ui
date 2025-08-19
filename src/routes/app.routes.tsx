import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "@/pages/home/home.tsx";

export default function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<Home />} path={"/"} />
    </Routes>
  );
}
