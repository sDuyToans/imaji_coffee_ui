import { ReactElement } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default.tsx";
import AccountHeader from "@/components/ui/account/account_header.tsx";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";

export default function AccountAddress(): ReactElement {
  return (
    <DefaultLayout>
      <AccountHeader
        content={"Here you can manage your address"}
        title={"Address"}
      />
      <AccountAddressContent />
    </DefaultLayout>
  );
}

function AccountAddressContent(): ReactElement {
  const navigate = useNavigate();

  return (
    <div
      className={
        "px-5 py-[48px] lg:px-[124px] lg:py-[80px] flex flex-col gap-[48px]"
      }
    >
      <div
        className={
          "flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center"
        }
      >
        <PrimaryButton type={"button"} onPress={() => navigate(-1)}>
          <IoArrowBack />
          <span>Back</span>
        </PrimaryButton>
        <p className={"font-medium text-4xl lg:text-5xl"}>Address List</p>
      </div>
      <div
        className={"flex flex-col gap-8 border border-light-grey-40 p-6 lg:p-8"}
      >
        <div
          className={
            "flex flex-col gap-3 lg:flex-row border-b border-light-grey-40 pb-5 lg:pb-8 "
          }
        >
          <div className={"flex flex-col gap-3 lg:flex-8/12"}>
            <h5 className={"text-primary text-base font-medium lg:text-xl"}>
              House - Main Address
            </h5>
            <p className={"text-xl font-medium lg:text-4xl"}>Jon Santos</p>
            <p className={"text-base lg:text-xl"}>(702) 555-0122</p>
            <p className={"text-base lg:text-xl"}>
              China Cottage Station Street, West Java, Depok City, Beji
              District, 16424
            </p>
            <p className={"text-base lg:text-xl"}>Indonesia</p>
          </div>
          <div className={"flex gap-4 w-1/2 lg:flex-4/12"}>
            <PrimaryButton type={"button"}>Edit</PrimaryButton>
            <PrimaryButton
              className={"bg-transparent border-red-500 text-red-500"}
              type={"button"}
            >
              Delete
            </PrimaryButton>
          </div>
        </div>

        <div
          className={
            "flex flex-col gap-3 lg:flex-row border-b border-light-grey-40 pb-5 lg:pb-8 "
          }
        >
          <div className={"flex flex-col gap-3 lg:flex-8/12"}>
            <h5 className={"text-primary text-base font-medium lg:text-xl"}>
              House - Main Address
            </h5>
            <p className={"text-xl font-medium lg:text-4xl"}>Jon Santos</p>
            <p className={"text-base lg:text-xl"}>(702) 555-0122</p>
            <p className={"text-base lg:text-xl"}>
              China Cottage Station Street, West Java, Depok City, Beji
              District, 16424
            </p>
            <p className={"text-base lg:text-xl"}>Indonesia</p>
          </div>
          <div className={"flex gap-4 w-1/2 lg:flex-4/12"}>
            <PrimaryButton type={"button"}>Edit</PrimaryButton>
            <PrimaryButton
              className={"bg-transparent border-red-500 text-red-500"}
              type={"button"}
            >
              Delete
            </PrimaryButton>
          </div>
        </div>

        <div
          className={
            "flex flex-col gap-3 lg:flex-row border-b border-light-grey-40 pb-5 lg:pb-8 "
          }
        >
          <div className={"flex flex-col gap-3 lg:flex-8/12"}>
            <h5 className={"text-primary text-base font-medium lg:text-xl"}>
              House - Main Address
            </h5>
            <p className={"text-xl font-medium lg:text-4xl"}>Jon Santos</p>
            <p className={"text-base lg:text-xl"}>(702) 555-0122</p>
            <p className={"text-base lg:text-xl"}>
              China Cottage Station Street, West Java, Depok City, Beji
              District, 16424
            </p>
            <p className={"text-base lg:text-xl"}>Indonesia</p>
          </div>
          <div className={"flex gap-4 w-1/2 lg:flex-4/12"}>
            <PrimaryButton type={"button"}>Edit</PrimaryButton>
            <PrimaryButton
              className={"bg-transparent border-red-500 text-red-500"}
              type={"button"}
            >
              Delete
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
