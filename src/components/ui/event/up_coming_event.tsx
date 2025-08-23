import { ReactElement } from "react";
import { Spinner } from "@heroui/spinner";

import PageHeading from "@/components/ui/page_heading.tsx";
import { EventItem } from "@/types";
import SliderItemCard from "@/components/ui/sliders/slider_item_card.tsx";
import { useGetUpComingEventQuery } from "@/api/events/eventsApi.ts";

export default function UpComingEvent(): ReactElement {
  return (
    <div className={"flex flex-col gap-[48px] lg:gap-[56px]"}>
      <EventTitle />
      <EventList />
    </div>
  );
}

function EventTitle(): ReactElement {
  return (
    <div
      className={
        "px-5 lg:px-[124px] flex flex-col lg:flex-row gap-6 lg:gap-[48px] items-start"
      }
    >
      <div className={"lg:flex-1"}>
        <PageHeading className={"text-left"} title={"Our Upcoming Events"} />
      </div>
      <p className={"text-xl lg:flex-1"}>
        We believe that we are big not because of us but because of them. they
        are the ones who motivate us to continue to innovate to provide a
        quality coffee taste and comfortable space that is getting better every
        day.
      </p>
    </div>
  );
}

function EventList(): ReactElement {
  const { data: upcomingEvents, isLoading } = useGetUpComingEventQuery();

  return (
    <div
      className={
        "flex flex-col gap-4 lg:gap-[48px] md:flex-row px-5 lg:px-[124px]"
      }
    >
      {isLoading && <Spinner color={"primary"} />}
      {upcomingEvents &&
        upcomingEvents.map(
          (event: EventItem): ReactElement => (
            <SliderItemCard
              key={event.eventId}
              descPos={"bottom"}
              item={event}
            />
          ),
        )}
    </div>
  );
}
