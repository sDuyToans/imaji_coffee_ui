import { ReactElement } from "react";
import { Spinner } from "@heroui/spinner";
import { Link } from "@heroui/link";

import { useGetAddressesQuery } from "@/api/account/accountApi.ts";
import { AddressResponseDto } from "@/types";

export default function AddressList(): ReactElement {
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
        <Link className={"text-primary"} href={"/account/address"}>
          Other Address ({addressList.length - 1})
        </Link>
      )}
    </div>
  );
}
