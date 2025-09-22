import { ReactElement, useState } from "react";

import FilterInput from "@/components/ui/filter/FilterInput.tsx";
import FilterSelect from "@/components/ui/filter/FilterSelect.tsx";
import OrderItemStatus from "@/components/ui/account/order_item_status.tsx";

export default function OrderHistory(): ReactElement {
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
