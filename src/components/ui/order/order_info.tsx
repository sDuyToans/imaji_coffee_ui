import { ReactElement } from "react";

import PrimaryButton from "@/components/ui/button/primary_button.tsx";

export default function OrderInfo(): ReactElement {
  return (
    <div
      className={
        "flex flex-col gap-6 lg:gap-5 pb-6 border-b border-neutral-200 w-full"
      }
    >
      <div
        className={
          "flex flex-col text-base lg:text-xl gap-2 lg:flex-row lg:justify-between lg:gap-5"
        }
      >
        <p className={"font-medium flex-1/5"}>Transaction Date</p>
        <p className={"font-normal flex-4/5"}>29 April 2023</p>
      </div>
      <div
        className={
          "flex flex-col text-base lg:text-xl gap-2 lg:flex-row lg:justify-between lg:gap-5"
        }
      >
        <p className={"font-medium flex-1/5"}>Payment Method</p>
        <p className={"font-normal flex-4/5"}>Credit or Debit Card</p>
      </div>
      <div>
        <div
          className={
            "flex flex-col text-base lg:text-xl gap-2 lg:flex-row lg:justify-between lg:gap-5"
          }
        >
          <p className={"font-medium flex-1/5"}>Ship Method</p>
          <div
            className={
              "flex-4/5 flex flex-col lg:flex-row gap-3 items-start lg:items-center"
            }
          >
            <p className={"font-normal"}>Free Shipping - (7 - 10 Days)</p>{" "}
            <PrimaryButton
              content={"Tracking"}
              type={"button"}
              onPress={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
