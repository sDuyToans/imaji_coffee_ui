import { ReactElement } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";

import DefaultLayout from "@/layouts/default.tsx";
import AccountHeader from "@/components/ui/account/account_header.tsx";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";
import { useGetUserInfoQuery } from "@/api/account/accountApi.ts";
import { UserDto } from "@/types";

export default function AccountSetting(): ReactElement {
  return (
    <DefaultLayout>
      <AccountHeader
        content={"Here you can update your account"}
        title={"Account Setting"}
      />
      <AccountSettingContent />
    </DefaultLayout>
  );
}

function AccountSettingContent(): ReactElement {
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
        <p className={"font-medium text-4xl lg:text-5xl"}>Change Account</p>
      </div>
      <div className={"w-full flex justify-center"}>
        <SettingForm />
      </div>
    </div>
  );
}

function SettingForm(): ReactElement {
  const { data, isLoading } = useGetUserInfoQuery();

  if (isLoading) return <Spinner color={"primary"} />;

  let userInfo: UserDto = data ?? {
    userId: -1,
    username: "John Doe",
    email: "johnDoe@email.com",
    phone: "(123) 2322-123",
  };

  return (
    <form
      className={
        "border border-light-grey-40 p-6 lg:p-8 flex flex-col gap-6 lg:w-[570px] w-full"
      }
    >
      <div>
        <Input
          classNames={{
            inputWrapper: "rounded-none  border border-primary bg-white",
            input: "rounded-none bg-white",
          }}
          label={"Name"}
          labelPlacement={"outside-top"}
          value={userInfo.username}
        />
      </div>
      <div>
        <Input
          classNames={{
            inputWrapper: "rounded-none  border border-primary bg-white",
            input: "rounded-none bg-white",
          }}
          label={"Email"}
          labelPlacement={"outside-top"}
          value={userInfo.email}
        />
      </div>
      <div className={"flex items-center justify-center w-full"}>
        <div className={"flex-1 h-[1px] bg-dark-grey-70"} />
        <p
          className={
            "mx-4 whitespace-nowrap text-dark-grey-70 text-base lg:text-lg"
          }
        >
          Change password
        </p>
        <div className={"flex-1 h-[1px] bg-dark-grey-70"} />
      </div>
      <div>
        <Input
          classNames={{
            inputWrapper: "rounded-none  border border-primary bg-white",
            input: "rounded-none bg-white",
          }}
          label={"Password"}
          labelPlacement={"outside-top"}
          placeholder={"Enter password"}
          type={"password"}
        />
      </div>
      <div>
        <Input
          classNames={{
            inputWrapper: "rounded-none  border border-primary bg-white",
            input: "rounded-none bg-white",
          }}
          label={"New Password"}
          labelPlacement={"outside-top"}
          placeholder={"Enter password"}
          type={"password"}
        />
      </div>
      <PrimaryButton className={"bg-primary text-white w-full"} type={"submit"}>
        {" "}
        Save Changes
      </PrimaryButton>
    </form>
  );
}
