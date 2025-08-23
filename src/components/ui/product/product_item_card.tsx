import { ReactElement } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";

import { ProductItem } from "@/types";

export default function ProductItemCard({
  product,
}: {
  product: ProductItem;
}): ReactElement {
  const { name, price, images, oldPrice, isAvailableAtWeb } = product;
  const heroImgUrl: string = images[0].imageUrl;

  function getDiscountPercentage(product: ProductItem): number {
    if (product.oldPrice <= 0 || product.oldPrice <= product.price) {
      return 0;
    }

    return Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100,
    );
  }
  let salePercentage: number = getDiscountPercentage(product);

  return (
    <Card className={"rounded-none"} isPressable={true} shadow={"none"}>
      <CardBody className={"overflow-visible p-0 relative"}>
        <Image
          alt={name}
          classNames={{
            wrapper: "w-full h-[160px] lg:h-[300px]",
            img: "w-full h-full object-cover rounded-none",
          }}
          radius={"lg"}
          shadow={"none"}
          src={heroImgUrl}
          width={"100%"}
        />
        {salePercentage > 0 && (
          <div
            className={
              "uppercase bg-[#F14C35] text-white w-[59px] h-[36px] lg:w-[91px] lg:h-[52px] flex items-center justify-center absolute top-0 left-0 z-999"
            }
          >
            <span>sale</span>
          </div>
        )}
      </CardBody>
      <CardFooter
        className={"text-small justify-between items-start flex flex-col gap-3"}
      >
        <div className={"flex flex-col gap-1 items-start"}>
          <p className={"text-base font-medium uppercase text-left"}>{name}</p>
          <div className={"text-xs text-[#7F7F7F] text-left"}>
            {isAvailableAtWeb ? (
              <span>Available Buy at Website</span>
            ) : (
              <span>Only at Cafe and Delivery</span>
            )}
          </div>
        </div>
        <div className={"flex flex-col items-start gap-1"}>
          <div className={"flex gap-1 items-center"}>
            <p className={"text-xl"}>{price}.00$</p>
            <p className={"text-sm line-through"}>{oldPrice}.00$</p>
          </div>
          <p className={"text-primary text-xs text-start"}>
            Get 20% Off in the App
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
