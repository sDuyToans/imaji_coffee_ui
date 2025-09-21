import type { ReactElement } from "react";

import DefaultLayout from "@/layouts/default.tsx";

export default function Account(): ReactElement {
  return (
    <DefaultLayout>
      <AccountHeader />
      <AccountContent />
    </DefaultLayout>
  );
}

function AccountHeader(): ReactElement {
  return (
    <div
      className={
        "bg-primary-surface-light w-dvw flex justify-center flex-col items-center px-5 py-[48px] lg:px-[124px] lg:py-[80px]"
      }
    >
      <h1 className={"text-6xl lg:text-8xl font-medium"}>My Account</h1>
      <p className={"text-base lg:text-xl text-center"}>
        Here you can manage your account, address and order
      </p>
    </div>
  );
}

function AccountContent(): ReactElement {
  return (
    <div
      className={
        "px-5 py-[48px] lg:px-[124px] lg:py-[80px] flex flex-col gap-[48px] lg:flex-row"
      }
    >
      {" "}
      <AccountDetail />
      <OrderHistory />
    </div>
  );
}

function AccountDetail(): ReactElement {
  return (
    <div className={"lg:flex-4/12 flex flex-col gap-8"}>
      <div>Account Detail</div>
      <div>Address</div>
    </div>
  );
}

function OrderHistory(): ReactElement {
  return <div className={"lg:flex-8/12"}>Order History</div>;
}
