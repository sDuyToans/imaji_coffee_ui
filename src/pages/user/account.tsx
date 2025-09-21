import { ReactElement, useState } from "react";
import { Link } from "@heroui/link";
import { Spinner } from "@heroui/spinner";

import DefaultLayout from "@/layouts/default.tsx";
import FilterInput from "@/components/ui/filter/FilterInput.tsx";
import FilterSelect from "@/components/ui/filter/FilterSelect.tsx";
import {
  useGetAccountOrdersQuery,
  useGetAddressesQuery,
} from "@/api/account/accountApi.ts";
import { AccountOrderResponseDto, AddressResponseDto } from "@/types";
import { formatDate } from "@/utils/formatDate.ts";

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
      <UserDetail />
      <AddressList />
    </div>
  );
}

function UserDetail(): ReactElement {
  return (
    <div
      className={
        "flex flex-col gap-6 lg:gap-7 border border-[#E3E3E3] p-6 lg:p-8"
      }
    >
      <h3 className={"text-2xl lg:text-3xl"}>Account Detail</h3>
      <div className={"flex flex-col gap-[12px]"}>
        <p className={"text-xl font-medium"}>Jhon Santos</p>
        <p className={"text-lg lg:text-xl"}>imajidigitalstudio@gmail.com</p>
        <p className={"text-lg lg:text-xl"}>(702) 555-0122</p>
      </div>
      <Link className={"text-primary"} href={"#"}>
        Account Setting
      </Link>
    </div>
  );
}

function AddressList(): ReactElement {
  const { data, isLoading } = useGetAddressesQuery();

  if (isLoading) return <Spinner color={"primary"} />;

  let addressList: AddressResponseDto[] = data ?? [];
  let defaultAddress: AddressResponseDto =
    addressList.find((a: AddressResponseDto) => a.isDefault) || addressList[0];

  const { street, city, province, postalCode, country, phoneNumber } =
    defaultAddress;

  return (
    <div
      className={
        "flex flex-col gap-6 lg:gap-7 border border-[#E3E3E3] p-6 lg:p-8"
      }
    >
      <h4 className={"text-2xl lg:text-3xl font-medium"}>Address</h4>
      <div className={"flex flex-col gap-[12px]"}>
        <p className={"text-lg lg:text-xl lg:font-medium"}>House</p>
        <p className={"text-lg lg:text-xl"}>{street}</p>
        <p className={"text-lg lg:text-xl"}>{city}</p>
        <p className={"text-lg lg:text-xl"}>
          {province} {postalCode}
        </p>
        <p className={"text-lg lg:text-xl"}>{country}</p>
        <p className={"text-lg lg:text-xl"}>{phoneNumber}</p>
      </div>

      {addressList.length > 1 && (
        <Link className={"text-primary"} href={"#"}>
          Other Address ({addressList.length - 1})
        </Link>
      )}
    </div>
  );
}

function OrderHistory(): ReactElement {
  const statusList = [
    { key: "All", label: "Filter status" },
    { key: "Pending", label: "Waiting to Payment" },
    { key: "Processed", label: "Processed" },
    { key: "Shipped", label: "Shipped" },
    { key: "Delivered", label: "Delivered" },
    { key: "Canceled", label: "Canceled" },
  ];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(statusList[0].key);

  return (
    <div className={"lg:flex-8/12 flex flex-col gap-8"}>
      <h1 className={"text-4xl lg:text-5xl text-left"}>Order History</h1>
      <div className={"flex gap-4 items-center lg:gap-7"}>
        <FilterInput label={"Search"} value={search} onChange={setSearch} />
        <FilterSelect
          label={"Filter status"}
          options={statusList}
          value={status}
          onChange={setStatus}
        />
      </div>
      <OrderItemStatus />
    </div>
  );
}

function OrderItemStatus(): ReactElement {
  const { data, isLoading } = useGetAccountOrdersQuery();

  if (isLoading) return <Spinner color={"primary"} />;
  const orderList: AccountOrderResponseDto[] = data ?? [];

  function renderStatus(status: string): ReactElement {
    switch (status) {
      case "PENDING":
        return (
          <p
            className={
              "flex-1 text-center py-2 lg:py-3 px-1 bg-dark-grey-70 text-xs lg:text-base"
            }
          >
            Waiting For Payment
          </p>
        );
      case "PAID":
        return (
          <p
            className={
              "flex-1 text-center py-2 lg:py-3 px-1 bg-[#FFA90B] text-xs lg:text-base"
            }
          >
            Processed
          </p>
        );
      case "CANCELED":
        return (
          <p
            className={
              "flex-1 text-center py-2 lg:py-3 px-1 bg-[#F14C35] text-xs lg:text-base"
            }
          >
            Canceled
          </p>
        );
      case "SHIPPED":
        return (
          <p
            className={
              "flex-1 text-center py-2 lg:py-3 px-1 bg-[#129BFF] text-xs lg:text-base"
            }
          >
            Shipped
          </p>
        );
      case "DELIVERED":
        return (
          <p
            className={
              "flex-1 text-center py-2 lg:py-3 px-1 bg-[#22D7A6] text-xs lg:text-base"
            }
          >
            Delivered
          </p>
        );
      default:
        return (
          <p
            className={
              "flex-1 text-center py-3 px-1 bg-dark-grey-70 text-xs lg:text-base"
            }
          >
            {status}
          </p>
        );
    }
  }

  return (
    <div className={"flex flex-col gap-5"}>
      <div className="hidden lg:flex gap-[48px] text-xl border-b border-neutral-400 pb-6">
        <div className="flex-1 text-center">Status</div>
        <div className="flex-1 text-center">Date</div>
        <div className="flex-1 text-center">OrderId</div>
        <div className="flex-1 text-center">Items</div>
        <div className="flex-1 text-center">Amount</div>
      </div>
      {orderList.length != 0 &&
        orderList.map(
          (o: AccountOrderResponseDto): ReactElement => (
            <div
              key={o.orderId}
              className={"flex gap-5 border-b border-[#E3E3E3] pb-5"}
            >
              <div className={"flex-1 text-center"}>
                {renderStatus(o.status)}
              </div>
              <p className={"flex-1 text-center text-lg lg:text-xl"}>
                {formatDate(o.createdAt)}
              </p>
              <p
                className={"text-primary flex-1 text-center text-lg lg:text-xl"}
              >
                <Link href={`/completed-checkout/${o.orderId}`}>
                  #{o.orderId}
                </Link>
              </p>
              <p className={"flex-1 text-center text-lg lg:text-xl"}>
                {o.items}
              </p>
              <p className={"flex-1 text-center text-lg lg:text-xl"}>
                ${o.amount}
              </p>
            </div>
          ),
        )}
    </div>
  );
}
