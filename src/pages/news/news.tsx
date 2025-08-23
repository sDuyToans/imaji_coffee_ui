import type { ReactElement } from "react";

import DefaultLayout from "@/layouts/default.tsx";
import HomeNew from "@/components/ui/home/home_new.tsx";
import NewList from "@/components/ui/news/new_list.tsx";

export default function News(): ReactElement {
  return (
    <DefaultLayout>
      <HomeNew />
      <NewList />
    </DefaultLayout>
  );
}
