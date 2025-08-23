import type { ReactElement } from "react";

import { Spinner } from "@heroui/spinner";

import { NewItem } from "@/types";
import NewItemCard from "@/components/ui/news/new_item_card.tsx";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";
import { useGetNewsQuery } from "@/api/news/newsApi.ts";

// const news: NewItem[] = [
//   {
//     id: 1,
//     title:
//       "Visited Doesoen Sirap Coffee, The Producer of Robusta in Central Java",
//     created_date: "August 19, 2022",
//     description: "desc",
//     image: "/news/Sections/Image1.png",
//     time: "4 Min",
//   },
//   {
//     id: 2,
//     title: "Cold Brew Coffee, How to Drink Cold Coffee is More Enjoyable",
//     created_date: "August 19, 2022",
//     description: "desc",
//     image: "/news/Sections/Image2.png",
//     time: "4 Min",
//   },
//   {
//     id: 3,
//     title: "Meet Coffee Tonic, the Sensation of Drinking Coffee-Flavored Soda",
//     created_date: "August 19, 2022",
//     description: "desc",
//     image: "/news/Sections/Image3.png",
//     time: "4 Min",
//   },
//   {
//     id: 4,
//     title: "Workshop Coffee Sharing Session",
//     created_date: "August 19, 2022",
//     description: "desc",
//     image: "/news/Sections/Image4.png",
//     time: "4 Min",
//   },
//   {
//     id: 5,
//     title: "Workshop Coffee Brewing",
//     created_date: "August 19, 2022",
//     description: "desc",
//     image: "/news/Sections/Image5.png",
//     time: "4 Min",
//   },
// ];

export default function NewList(): ReactElement {
  const { data: news, isLoading } = useGetNewsQuery();
  const handleLoadMore: () => void = (): void => {};

  return (
    <div
      className={
        "px-5 py-[48px] lg:py-[80px] flex flex-col gap-6 lg:gap-8 lg:px-[124px]"
      }
    >
      {isLoading && <Spinner color={"primary"} />}
      {news &&
        news.map(
          (n: NewItem): ReactElement => (
            <NewItemCard key={n.newId} newItem={n} />
          ),
        )}
      <div className={"w-full flex justify-center items-center"}>
        <PrimaryButton
          content={"Load More News"}
          type={"button"}
          onClick={handleLoadMore}
        />
      </div>
    </div>
  );
}
