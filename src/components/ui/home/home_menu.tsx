import { ReactElement } from "react";

import PageHeading from "@/components/ui/page_heading.tsx";
import { ProductItem } from "@/types";
import ProductContainer from "@/components/ui/product/product_container.tsx";
import PrimaryLink from "@/components/ui/button/primary_link.tsx";

export default function HomeMenu(): ReactElement {
  return (
    <div
      className={
        "px-[20px] py-[48px] md:my-[80px] flex flex-col gap-[48px] md:gap-[56px] lg:px-[124px]"
      }
    >
      <MenuTitle />
      <MenuContent />
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
      <PrimaryLink content={"Explore Other Menu"} to={"/store"} />
    </div>
  );
}

function MenuContent(): ReactElement {
  let products: ProductItem[] = [
    {
      id: 1,
      name: "Ristretto Bianco",
      price: 5.0,
      oldPrice: 6.0,
      isAvailableAtWeb: false,
      images: ["/home/menu/Sections/Image1.png"],
      description: "a",
    },
    {
      id: 2,
      name: "French toast WITH SUGAR ",
      price: 5.0,
      oldPrice: 6.0,
      isAvailableAtWeb: false,
      images: ["/home/menu/Sections/Image2.png"],
      description: "a",
    },
    {
      id: 3,
      name: "AT HOME HOUSE BLEND",
      price: 5.0,
      oldPrice: 6.0,
      isAvailableAtWeb: true,
      images: ["/home/menu/Sections/Image3.png"],
      description: "a",
    },
    {
      id: 4,
      name: "AT HOME HOUSE classic",
      price: 5.0,
      oldPrice: 6.0,
      isAvailableAtWeb: true,
      images: ["/home/menu/Sections/Image4.png"],
      description: "a",
    },
  ];

  return (
    <div>
      <ProductContainer products={products} />
    </div>
  );
}
