import { Dispatch, ReactElement, SetStateAction } from "react";

import { useProducts } from "@/hooks/useProducts";
import { Option, ProductItem } from "@/types";
import ProductItemCard from "@/components/ui/product/product_item_card.tsx";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";
import { tabs } from "@/components/ui/menu/menu_config.ts";

type MenuListProps = {
  page: number;
  search: string;
  price: string;
  sort: string;
  activeCategory: string;
  onTabChange: (value: string) => void;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function MenuList({
  page,
  search,
  price,
  sort,
  activeCategory,
  onTabChange,
  setPage,
}: MenuListProps): ReactElement {
  const { data, isFetching } = useProducts(
    activeCategory,
    page,
    search,
    price,
    sort,
  );

  let products = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;

  const handleLoadMore = () => {
    if (page + 1 < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className={"flex flex-col gap-[48px]"}>
        <ul className={"uppercase flex justify-between w-full"}>
          {tabs.map(
            (tab: Option): ReactElement => (
              <li key={tab.key} className={"w-full flex-1"}>
                <button
                  className={`cursor-pointer px-4 py-2 w-full text-xl ${
                    activeCategory === tab.key
                      ? "border-b-1 border-neutral-900 dark:border-primary" +
                        " font-bold"
                      : ""
                  }`}
                  onClick={() => onTabChange(tab.key)}
                >
                  {tab.label}
                </button>
              </li>
            ),
          )}
        </ul>

        <div
          className={"grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-y-[48px]"}
        >
          {products.map(
            (p: ProductItem): ReactElement => (
              <ProductItemCard key={p.productId} product={p} />
            ),
          )}
        </div>

        {/* Load More */}
        <div className="w-full flex justify-center items-center">
          {products.length < totalElements && (
            <PrimaryButton
              content={isFetching ? "Loading..." : "Load More"}
              type="button"
              onPress={handleLoadMore}
            />
          )}
        </div>
      </div>
    </div>
  );
}
