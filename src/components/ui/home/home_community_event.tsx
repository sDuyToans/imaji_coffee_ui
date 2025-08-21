import { ReactElement } from "react";
import { Slider } from "@heroui/slider";

import PageHeading from "@/components/ui/page_heading.tsx";
import PrimaryLink from "@/components/ui/button/primary_link.tsx";
import { SliderItem } from "@/types";
import CustomCarousel from "@/libs/slider/custom_carousel.tsx";
import { Icon } from "@/components/layouts/icons.tsx";

export default function HomeCommunityEvent(): ReactElement {
  return (
    <div className={"flex flex-col gap-[56px] py-[80px]"}>
      <Title />
      <Content />
      <Podcast />
    </div>
  );
}

function Title(): ReactElement {
  return (
    <div className={"px-5 lg:px-[124px]"}>
      <PageHeading
        className={"text-left"}
        title={"We Grow Together With Out Customer"}
      />
    </div>
  );
}

function Content(): ReactElement {
  const eventItems: SliderItem[] = [
    {
      id: 1,
      name: "latter art workshop",
      type: "20 Feb 2023",
      image: "/home/event/card/Sections/Image1.png",
    },
    {
      id: 2,
      name: "EXHIBITION COFFEE HARDWARE",
      type: "20 Mar 2023",
      image: "/home/event/card/Sections/Image2.png",
    },
    {
      id: 3,
      name: "Factory visit",
      type: "20 Apr 2023",
      image: "/home/event/card/Sections/Image3.png",
    },
  ];

  return (
    <div
      className={
        "px-5 lg:pl-[124px] flex flex-col gap-6 lg:flex-row lg:gap-[48px] items-center"
      }
    >
      <div className={"flex flex-col gap-6 lg:gap-[80px] lg:flex-3/5"}>
        <p>
          We believe that we are big not because of us but because of them. they
          are the ones who motivate us to continue to innovate to provide a
          quality coffee taste and comfortable space that is getting better
          every day.
        </p>
        <PrimaryLink content={"Explore Other Event"} to={"/community"} />
      </div>
      <CustomCarousel
        isLoop={true}
        isShowControl={false}
        pos={"bottom"}
        slides={eventItems}
      />
    </div>
  );
}

function Podcast(): ReactElement {
  // @ts-ignore
  return (
    <div className={"px-5 md:px-[124px]"}>
      <div
        className={
          "bg-primary h-[184px] lg:h-[292px] p-5 md:p-8 xl:px-[40px] flex flex-col gap-[20px] lg:gap-[32px]"
        }
      >
        <div className={"flex gap-4 lg:gap-8 items-center justify-between"}>
          <div
            className={"relative w-[80px] h-[80px] lg:w-[140px] lg:h-[140px]"}
          >
            <div
              className={
                "flex flex-col items-center gap-[3px] lg:gap-[9px] absolute top-0 -left-5 lg:-left-12 lg:top-5 z-999 transform translate-1/2"
              }
            >
              <Icon name={"airplay-alt"} />
              <p className={"text-white text-[6px] lg:text-xs"}>
                Imaji Coffee Podcast
              </p>
            </div>
            <div
              className={
                "w-full h-full bg-[#000000]/50 absolute top-0 left-0 z-30"
              }
            />
            <img
              alt={"airplay"}
              className={
                "object-cover absolute top-0 left-0 z-10 w-full h-full"
              }
              src={"/home/event/podcard/Image.png"}
            />
          </div>
          <div className={"text-white w-1/2"}>
            <p className={"text-base lg:text-5xl"}>
              Mix The Taste of Indonesian Coffee
            </p>
            <p className={"text-xs lg:text-lg flex gap-1 lg:gap-[10px]"}>
              Feb 2023 <li>1 hr 13 min</li>
            </p>
          </div>
          <div className={""}>
            <Icon className={"hidden lg:block"} name={"spotify"} size={50} />
            <Icon className={"lg:hidden"} name={"spotify"} size={30} />
          </div>
        </div>

        <div className={"flex flex-row items-center gap-[16px] lg:gap-[30px]"}>
          <div className={"text-white flex gap-[8px] lg:gap-[32px]"}>
            <div>
              <Icon name={"arrow-reply"} />
              <p>10s</p>
            </div>
            <div>
              <Icon name={"arrow-share"} />
              <p>10s</p>
            </div>
            <div className={"flex gap-[8px] lg:gap-[32px] items-center"}>
              <Slider
                aria-label="Music progress"
                className={"w-[75px] md:w-[250px] lg:w-[730px] "}
                classNames={{
                  track: "bg-white",
                  filler: "bg-white",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-white",
                }}
                // color="foreground"
                defaultValue={33}
                size="sm"
              />
              <p>00:03/1:13:56</p>
              <Icon name={"volume-high"} />
            </div>
          </div>
          <Icon name={"btn_play"} size={30} />
        </div>
      </div>
    </div>
  );
}
