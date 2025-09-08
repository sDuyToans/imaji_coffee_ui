import { ReactElement } from "react";
import { Image } from "@heroui/image";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

import { NewItem } from "@/types";
import { formatDate } from "@/utils/formatDate.ts";

interface Props {
  newItem: NewItem;
}

export default function NewItemCard(props: Props): ReactElement {
  const { newItem } = props;
  const { newId, title, image, createdAt, time } = newItem;

  let created_date: string = formatDate(createdAt);

  return (
    <Link
      className={
        "flex flex-col items-center justify-center gap-5 md:flex-row lg:gap-[48px] py-5 lg:py-8"
      }
      to={`/news/${newId}`}
    >
      <Image
        alt={title}
        className={
          "rounded-none w-[350px] h-[200px] md:w-[260px] flex-1 object-cover"
        }
        src={image}
      />
      <div className={"flex flex-col gap-3 lg:gap-4 flex-1"}>
        <p className={"text-4xl lg:text-5xl"}>{title}</p>
        <p className={"text-2xl text-dark-grey-70 flex gap-2 items-center"}>
          <span>{time}</span>
          <GoDotFill />
          <span>{created_date}</span>
        </p>
      </div>
    </Link>
  );
}
