import { ReactElement } from "react";
import { FaCircle } from "react-icons/fa6";

import { Icon } from "@/components/layouts/icons.tsx";

export default function Podcast(): ReactElement {
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
            <p
              className={
                "text-xs lg:text-lg flex gap-1 lg:gap-[10px] flex items-center"
              }
            >
              <span>Feb 2023</span> <FaCircle size={10} />{" "}
              <span>1 hr 13 min</span>
            </p>
          </div>
          <div className={""}>
            <Icon className={"hidden lg:block"} name={"spotify"} size={50} />
            <Icon className={"lg:hidden"} name={"spotify"} size={30} />
          </div>
        </div>

        <div className={"flex flex-row items-center gap-[16px] lg:gap-[30px]"}>
          <div className={"text-white flex gap-[8px] lg:gap-[32px] w-full"}>
            <div
              className={
                "flex gap-[8px] lg:gap-[32px] items-center justify-center w-full"
              }
            >
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio
                controls
                aria-label="Podcast Audio"
                className={"w-[80%]"}
                src="https://audiob1231231.s3.us-east-2.amazonaws.com/jazz-cafe-music-348267.mp3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
