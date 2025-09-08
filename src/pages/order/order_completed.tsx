import { ReactElement } from "react";

import DefaultLayout from "@/layouts/default.tsx";
import PrimaryLink from "@/components/ui/button/primary_link.tsx";
import SuccessIcon from "@/components/ui/order/success_icon.tsx";
import SuccessHeading from "@/components/ui/order/success_heading.tsx";
import OrderInfo from "@/components/ui/order/order_info.tsx";
import YourOrder from "@/components/ui/order/your_order.tsx";

export default function OrderCompleted(): ReactElement {
  return (
    <DefaultLayout>
      <div
        className={
          "px-5 py-[48px] lg:py-[80px] lg:px-[124px] flex flex-col gap-[48px]"
        }
      >
        <OrderSuccess />
      </div>
    </DefaultLayout>
  );
}

function OrderSuccess(): ReactElement {
  return (
    <div className={"flex flex-col gap-[48px]"}>
      <SuccessIcon />
      <SuccessHeading />
      <OrderInfo />
      <YourOrder />
      <ButtonOrder />
    </div>
  );
}

function ButtonOrder(): ReactElement {
  return (
    <div className={"w-full flex justify-center"}>
      <PrimaryLink content={"Continue Shopping"} to={"/menu"} />
    </div>
  );
}
