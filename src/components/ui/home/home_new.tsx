import { ReactElement } from "react";
import { Image } from "@heroui/image";

import PageHeading from "@/components/ui/page_heading.tsx";

export default function HomeNew(): ReactElement {
  return (
    <div
      className={
        "px-5 lg:px-[124px] flex flex-col items-center justify-center gap-[48px] lg:gap-[56px] py-[48px] lg:py-[80px] bg-[#FCF7EF] dark:text-primary"
      }
    >
      <NewTitle />
      <NewContent />
    </div>
  );
}

function NewTitle(): ReactElement {
  return (
    <div className={"flex flex-col gap-4 lg:gap-5 justify-center items-center"}>
      <PageHeading title={"Our News"} />
      <p className={"text-base lg:text-xl"}>
        Get the latest updates and deeper coffee experience from IMAJI Coffee
      </p>
    </div>
  );
}

function NewContent(): ReactElement {
  return (
    <div className={"flex flex-col gap-6"}>
      <Image
        alt={"new"}
        className={"rounded-none"}
        src={"/home/new/Sections/Image.png"}
      />
      <div className={"flex flex-col gap-4 lg:gap-3"}>
        <p className={"text-3xl"}>
          Collaboration to Develop Coffee and Beverage Industry Expertise in
          Indonesia
        </p>
        <p
          className={
            "text-lg lg:text-2xl text-dark-grey-70 flex gap-3 items-center"
          }
        >
          4 Min <li>August 19, 2022</li>
        </p>
      </div>
    </div>
  );
}
