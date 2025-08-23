import { ReactElement } from "react";
import { Spinner } from "@heroui/spinner";

import { EventItem } from "@/types";
import SliderItemCard from "@/components/ui/sliders/slider_item_card.tsx";
import { useGetClosedEventQuery } from "@/api/events/eventsApi.ts";

export default function ClosedEvent(): ReactElement {
  return (
    <div className={"py-[48px] flex flex-col gap-[10px] lg:gap-[80px]"}>
      <p className={"text-left px-5 lg:px-[124px] text-5xl lg:text-7lg"}>
        Event Closed
      </p>
      <EventList />
    </div>
  );
}

function EventList(): ReactElement {
  const { data: closedEvents, isLoading } = useGetClosedEventQuery();

  return (
    <div
      className={
        "px-5 lg:px-[124px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 gap-4 lg:h-[848px]"
      }
    >
      {isLoading && <Spinner color={"primary"} />}
      {closedEvents &&
        closedEvents.map((ev: EventItem, index: number): ReactElement => {
          if (index === 0)
            return (
              <SliderItemCard
                key={ev.eventId}
                descPos={"bottom"}
                item={ev}
                styles={"lg:col-span-2 lg:row-span-2"}
              />
            );
          else
            return (
              <SliderItemCard
                key={ev.eventId}
                descPos={"bottom"}
                item={ev}
                styles={"lg:row-span-2"}
              />
            );
        })}
    </div>
  );
}
