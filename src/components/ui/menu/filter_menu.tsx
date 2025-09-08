import { ReactElement } from "react";

import FilterInput from "@/components/ui/filter/FilterInput.tsx";
import FilterSelect from "@/components/ui/filter/FilterSelect.tsx";
import {
  bestSellingSelects,
  priceSelects,
} from "@/components/ui/menu/menu_config.ts";

type FilterMenuProps = {
  search: string;
  price: string;
  sort: string;
  setSearch: (value: string) => void;
  setPrice: (value: string) => void;
  setSort: (value: string) => void;
};

export default function FilterMenu({
  setSearch,
  search,
  price,
  setPrice,
  sort,
  setSort,
}: FilterMenuProps): ReactElement {
  return (
    <div className={"flex flex-col md:flex-row gap-[48px]"}>
      <FilterInput label={"Search"} value={search} onChange={setSearch} />

      <div className="flex-1 flex flex-col md:flex-row gap-[48px]">
        <FilterSelect
          label="Price"
          options={priceSelects}
          value={price}
          onChange={setPrice}
        />
        <FilterSelect
          label="Sort By"
          options={bestSellingSelects}
          value={sort}
          onChange={setSort}
        />
      </div>
    </div>
  );
}
