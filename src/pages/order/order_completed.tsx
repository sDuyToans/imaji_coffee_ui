import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "@heroui/spinner";

import DefaultLayout from "@/layouts/default.tsx";
import PrimaryLink from "@/components/ui/button/primary_link.tsx";
import SuccessIcon from "@/components/ui/order/success_icon.tsx";
import SuccessHeading from "@/components/ui/order/success_heading.tsx";
import OrderInfo from "@/components/ui/order/order_info.tsx";
import YourOrder from "@/components/ui/order/your_order.tsx";
import { useGetOrderByIdQuery } from "@/api/order/orderApi.ts";
import { OrderDetail } from "@/types";

export default function OrderCompleted(): ReactElement {
  const params = useParams();
  const orderId = params.orderId;

  const { data, isLoading } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <Spinner color={"primary"} />;

  return (
    <DefaultLayout>
      <div
        className={
          "px-5 py-[48px] lg:py-[80px] lg:px-[124px] flex flex-col gap-[48px]"
        }
      >
        <OrderSuccess orderDetail={data} />
      </div>
    </DefaultLayout>
  );
}

function OrderSuccess({
  orderDetail,
}: {
  orderDetail: OrderDetail;
}): ReactElement {
  const {
    email,
    items,
    totalAmount,
    taxAmount,
    shippingAmount,
    discountAmount,
    paymentMethod,
    shippingMethod,
    createdAt,
  } = orderDetail;

  console.log(orderDetail);

  return (
    <div className={"flex flex-col gap-[48px]"}>
      <SuccessIcon />
      <SuccessHeading email={email} />
      <OrderInfo
        paymentMethod={paymentMethod}
        shipMethod={shippingMethod}
        total={totalAmount}
        transactionDate={createdAt}
      />
      <YourOrder
        discount={discountAmount}
        items={items}
        ship={shippingAmount}
        tax={taxAmount}
        total={totalAmount}
      />
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
