import { ReactElement } from "react";
import { Spinner } from "@heroui/spinner";
import { Link } from "@heroui/link";
import { Accordion, AccordionItem } from "@heroui/accordion";

import { useGetAccountOrdersQuery } from "@/api/account/accountApi.ts";
import { AccountOrderResponseDto } from "@/types";
import { formatDate } from "@/utils/formatDate.ts";

export default function OrderItemStatus(): ReactElement {
  const { data, isLoading } = useGetAccountOrdersQuery();

  if (isLoading) return <Spinner color={"primary"} />;
  // @ts-ignore
  if (data && data.length === 0)
    return <div>Nothing to display. Please made an order and come back</div>;
  const orderList: AccountOrderResponseDto[] = data ?? [];

  function renderStatus(status: string): ReactElement {
    switch (status) {
      case "PENDING":
        return (
          <p
            className={
              "flex-1 text-center py-2 lg:py-3 px-1 bg-[#E3E3E3] text-xs lg:text-base h-[32px] w-[180px] flex justify-center items-center"
            }
          >
            Waiting For Payment
          </p>
        );
      case "PAID":
        return (
          <p
            className={
              "flex-1 text-center py-2 lg:py-3 px-1 bg-[#FFA90B] text-xs lg:text-base h-[32px] w-[180px] flex justify-center items-center"
            }
          >
            Processed
          </p>
        );
      case "CANCELED":
        return (
          <p
            className={
              "flex-1 text-center py-2 lg:py-3 px-1 bg-[#F14C35] text-xs lg:text-base h-[32px] w-[180px] flex justify-center items-center"
            }
          >
            Canceled
          </p>
        );
      case "SHIPPED":
        return (
          <p
            className={
              "flex-1 text-center py-2 lg:py-3 px-1 bg-[#129BFF] text-xs lg:text-base h-[32px] w-[180px] flex justify-center items-center"
            }
          >
            Shipped
          </p>
        );
      case "DELIVERED":
        return (
          <p
            className={
              "flex-1 text-center py-2 lg:py-3 px-1 bg-[#22D7A6] text-xs lg:text-base h-[32px] w-[180px] flex justify-center items-center"
            }
          >
            Delivered
          </p>
        );
      default:
        return (
          <p
            className={
              "flex-1 text-center py-3 px-1 bg-dark-grey-70 text-xs lg:text-base h-[32px] w-[180px] flex justify-center items-center"
            }
          >
            {status}
          </p>
        );
    }
  }

  return (
    <>
      <div className={"hidden md:flex flex-col gap-5"}>
        <div className="flex gap-[48px] text-xl border-b border-neutral-400 pb-6">
          <div className="flex-4/12 text-center">Status</div>
          <div className="flex-2/12 text-center">Date</div>
          <div className="flex-2/12 text-center">OrderId</div>
          <div className="flex-2/12 text-center">Items</div>
          <div className="flex-2/12 text-center">Amount</div>
        </div>
        {orderList.length != 0 ? (
          orderList.map(
            (o: AccountOrderResponseDto): ReactElement => (
              <div
                key={o.orderId}
                className={"flex gap-5 border-b border-[#E3E3E3] pb-5"}
              >
                <div className={"flex-4/12 text-center flex items-center"}>
                  {renderStatus(o.status)}
                </div>
                <p className={"flex-2/12 text-center text-lg lg:text-xl"}>
                  {formatDate(o.createdAt)}
                </p>
                <p
                  className={
                    "text-primary flex-2/12 text-center text-lg lg:text-xl"
                  }
                >
                  <Link href={`/completed-checkout/${o.orderId}`}>
                    #{o.orderId}
                  </Link>
                </p>
                <p className={"flex-2/12 text-center text-lg lg:text-xl"}>
                  {o.items}
                </p>
                <p className={"flex-2/12 text-center text-lg lg:text-xl"}>
                  ${o.amount}
                </p>
              </div>
            ),
          )
        ) : (
          <p>You have no order. Please made one and come back</p>
        )}
      </div>
      <div className={"flex flex-col gap-6 md:hidden"}>
        <div className="flex md:hidden gap-[48px] text-xl border-b border-neutral-400 pb-6 ">
          <div className="flex-1 text-center">Status</div>
          <div className="flex-1 text-center">Date</div>
        </div>
        <div
          className={'className={"flex gap-5 border-b border-[#E3E3E3] pb-5"}'}
        >
          <Accordion>
            {orderList.length > 0 ? (
              orderList.map((o, i) => (
                <AccordionItem
                  key={o.orderId}
                  aria-label={`Order number ${i + 1}`}
                  title={`Order # ${i + 1}`}
                >
                  <div className={"flex flex-col gap-4"}>
                    <div className={"flex justify-between items-center"}>
                      <div>{renderStatus(o.status)}</div>
                      <div>{formatDate(o.createdAt)}</div>
                    </div>
                    <div className={"flex gap-2"}>
                      <p
                        className={
                          "flex-1 text-center text-lg lg:text-xl flex flex-col gap-1 items-center"
                        }
                      >
                        <span>Order Id</span>
                        <Link href={`/completed-checkout/${o.orderId}`}>
                          <span className={"text-primary"}>#{o.orderId}</span>
                        </Link>
                      </p>
                      <p
                        className={
                          "flex-1 text-center text-lg lg:text-xl flex flex-col gap-1 items-center"
                        }
                      >
                        <span>Items</span>
                        <span>{o.items}</span>
                      </p>
                      <p
                        className={
                          "flex-1 text-center text-lg lg:text-xl flex flex-col gap-1 items-center"
                        }
                      >
                        <span>Amount</span>
                        <span>${o.amount}</span>
                      </p>
                    </div>
                  </div>
                </AccordionItem>
              ))
            ) : (
              <p>You have no order. Please made one and come back</p>
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
}
