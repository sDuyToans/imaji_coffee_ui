import { ReactElement } from "react";
import { Spinner } from "@heroui/spinner";

import PageHeading from "@/components/ui/page_heading.tsx";
import { ProductItem } from "@/types";
import ProductContainer from "@/components/ui/product/product_container.tsx";
import PrimaryLink from "@/components/ui/button/primary_link.tsx";
import { useGetProductsBySizeQuery } from "@/api/products/productsApi.ts";

export default function HomeMenu(): ReactElement {
  const { data: products, isLoading } = useGetProductsBySizeQuery({ size: 4 });

  return (
    <div
      className={
        "px-[20px] py-[48px] md:my-[80px] flex flex-col gap-[48px] md:gap-[56px] lg:px-[124px]"
      }
    >
      <MenuTitle />
      {isLoading ? (
        <Spinner color={"primary"} />
      ) : (
        <MenuContent products={products ?? []} />
      )}
    </div>
  );
}

function MenuTitle(): ReactElement {
  return (
    <div
      className={
        "flex flex-col md:flex-row items-left md:items-center gap-[32px] max-w-[1192px]"
      }
    >
      <PageHeading className={"text-left"} title={"Find Your Favorite Menu"} />
      <PrimaryLink content={"Explore Other Menu"} to={"/menu"} />
    </div>
  );
}

function MenuContent({ products }: { products: ProductItem[] }): ReactElement {
  return (
    <div>
      <ProductContainer products={products} />
    </div>
  );
}
