import { ReactElement } from "react";

import PageHeading from "@/components/ui/page_heading.tsx";
import CustomCarousel from "@/libs/slider/custom_carousel.tsx";
import { SliderItem } from "@/types";

export default function HomeSpace(): ReactElement {
  return (
    <div
      className={
        "flex flex-col gap-[48px] lg:gap-[56px] my-[48px] lg:my-[80px] px-5 lg:px-[124px]"
      }
    >
      <SpaceTitle />
      <SpaceContent />
    </div>
  );
}

function SpaceTitle(): ReactElement {
  return (
    <div>
      <PageHeading className={"text-left"} title={"8 Comfy Workspace"} />
      <p className={"text-base lg:text-xl lg:w-1/2"}>
        We provide many attractive and unique workspaces so you will have no
        trouble finding the workspace you want.
      </p>
    </div>
  );
}

function SpaceContent(): ReactElement {
  let spaces: SliderItem[] = [
    {
      id: 1,
      name: "white wall",
      type: "workspace",
      image: "/home/space/Sections/Image1.png",
    },
    {
      id: 2,
      name: "long window",
      type: "workspace",
      image: "/home/space/Sections/Image2.png",
    },
    {
      id: 3,
      name: "gengs space",
      type: "workspace",
      image: "/home/space/Sections/Image3.png",
    },
    {
      id: 4,
      name: "seminar area",
      type: "event space",
      image: "/home/space/Sections/Image4.png",
    },
    {
      id: 5,
      name: "center area",
      type: "event space",
      image: "/home/space/Sections/Image5.png",
    },
    {
      id: 6,
      name: "aquarium",
      type: "meeting space",
      image: "/home/space/Sections/Image6.png",
    },
    {
      id: 7,
      name: "roftop",
      type: "workspace",
      image: "/home/space/Sections/Image7.png",
    },
    {
      id: 8,
      name: "hamble space",
      type: "meeting space",
      image: "/home/space/Sections/Image8.png",
    },
  ];

  return (
    <div>
      <CustomCarousel isLoop={true} isShowControl={true} slides={spaces} />
    </div>
  );
}
