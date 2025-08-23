import type { ReactElement } from "react";

import DefaultLayout from "@/layouts/default.tsx";
import UpComingEvent from "@/components/ui/event/up_coming_event.tsx";
import ClosedEvent from "@/components/ui/event/closed_event.tsx";

export default function Event(): ReactElement {
  return (
    <DefaultLayout>
      <UpComingEvent />
      <ClosedEvent />
    </DefaultLayout>
  );
}
