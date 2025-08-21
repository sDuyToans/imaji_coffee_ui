import { ReactElement } from "react";
import { Image } from "@heroui/image";
import { Card, CardBody } from "@heroui/card";

import { SliderItem } from "@/types";

export default function SliderItemCard({
  item,
  descPos = "top",
}: {
  item: SliderItem;
  descPos?: "top" | "bottom";
}): ReactElement {
  const { name, type, image } = item;
  let pos: string = descPos === "top" ? "top-0" : "bottom-0";

  return (
    <Card className={"rounded-none p-0"}>
      <CardBody className={"p-0 relative"}>
        <Image alt={name} className={"rounded-none"} src={image} />
        <div
          className={`flex flex-col p-2 justify-center items-center min-w-[133px] min-h-[68px] lg:min-w-[165px] lg:min-h-[84px] bg-white absolute left-0 z-999 ${pos}`}
        >
          <p className={"capitalize text-base lg:text-xl dark:text-black"}>
            {name}
          </p>
          <p className={"text-xs lg:text-sm text-[#A27B5C]"}>{type}</p>
        </div>
      </CardBody>
    </Card>
  );
}
