import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "@/pages/home/home.tsx";
import News from "@/pages/news/news.tsx";
import Event from "@/pages/event/event.tsx";
import NewDetail from "@/components/ui/news/new_detail.tsx";
import Error from "@/pages/error/error.tsx";
import Menu from "@/pages/menu/menu.tsx";
import Product from "@/pages/product/product.tsx";
import Cart from "@/pages/cart/cart.tsx";
import OrderCompleted from "@/pages/order/order_completed.tsx";

export default function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<Home />} path={"/"} />
      <Route path={"/news"}>
        <Route index element={<News />} />
        <Route element={<NewDetail />} path={":newId"} />
      </Route>
      <Route element={<Event />} path={"/community"} />
      <Route path={"/menu"}>
        <Route index element={<Menu />} />
        <Route element={<Product />} path={"detail/:productId"} />
      </Route>
      <Route element={<Cart />} path={"/cart"} />
      <Route element={<OrderCompleted />} path={"/completed-checkout"} />
      {/*Catch-all unknown routes*/}
      <Route element={<Error />} path={"*"} />
    </Routes>
  );
}
