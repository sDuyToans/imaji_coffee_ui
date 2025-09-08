import { ReactElement, useState } from "react";

import DefaultLayout from "@/layouts/default.tsx";
import { MenuHeading } from "@/components/ui/menu/menu_heading.tsx";
import MenuList from "@/components/ui/menu/menu_list.tsx";
import FilterMenu from "@/components/ui/menu/filter_menu.tsx";
import { tabs } from "@/components/ui/menu/menu_config.ts";

export default function Menu(): ReactElement {
  return (
    <DefaultLayout>
      <div className={"py-[48px] lg:py-[80px] flex flex-col gap-[48px]"}>
        <MenuHeading />
        <MenuContent />
      </div>
    </DefaultLayout>
  );
}

function MenuContent(): ReactElement {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("all");
  const [page, setPage] = useState(0);

  const [activeCategory, setActiveCategory] = useState(tabs[0].key);

  const handleTabChange = (category: string) => {
    setActiveCategory(category);
    setSearch(""); // reset search when switching category
    setPage(0);
  };

  return (
    <div className={"px-5 lg:px-[124px] flex flex-col gap-[48px]"}>
      <FilterMenu
        price={price}
        search={search}
        setPrice={(v) => {
          setPrice(v);
          setPage(0);
        }}
        setSearch={(v) => {
          setSearch(v);
          setPage(0);
        }}
        setSort={(v) => {
          setSort(v);
          setPage(0);
        }}
        sort={sort}
      />
      <MenuList
        activeCategory={activeCategory}
        page={page}
        price={price}
        search={search}
        setPage={setPage}
        sort={sort}
        onTabChange={handleTabChange}
      />
    </div>
  );
}
