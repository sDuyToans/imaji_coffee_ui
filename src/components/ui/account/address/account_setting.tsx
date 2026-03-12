import React, { ReactElement, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@heroui/spinner";

import DefaultLayout from "@/layouts/default.tsx";
import AccountHeader from "@/components/ui/account/account_header.tsx";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";
import { useGetUserInfoQuery } from "@/api/account/accountApi.ts";
import { UserDto } from "@/types";
import Input_custom_with_type from "@/components/ui/custom/input_custom_with_type.tsx";
import { INPUT_TYPES } from "@/utils/enums/EnumsType.ts";

type InitialPasswordForm = {
  password: string;
  new_password: string;
};

const initialPasswordForm = {
  password: "",
  new_password: "",
};

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
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);

  const onChangePasswordForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) return <Spinner color={"primary"} />;

  let userInfo: UserDto = data ?? {
    userId: -1,
    username: "John Doe",
    email: "johnDoe@email.com",
    phone: "(123) 2322-123",
  };

  return (
    <div
      className={
        "border border-light-grey-40 p-6 lg:p-8 flex flex-col gap-6 lg:w-[570px] w-full"
      }
    >
      <div>
        <Input_custom_with_type
          input_type={INPUT_TYPES.TEXT}
          label={"Name"}
          name={"username"}
          on_change={() => {}}
          value={userInfo.username}
        />
      </div>
      <div>
        <Input_custom_with_type
          input_type={INPUT_TYPES.TEXT}
          label={"Email"}
          name={"email"}
          on_change={() => {}}
          value={userInfo.email}
        />
      </div>
      <div>
        <Input_custom_with_type
          input_type={INPUT_TYPES.TEXT}
          label={"Phone Number"}
          name={"phone"}
          on_change={() => {}}
          value={userInfo.phone}
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
      <UpdatePassword
        passwordForm={passwordForm}
        onChangePasswordForm={onChangePasswordForm}
      />
    </div>
  );
}

type UpdatePasswordProp = {
  onChangePasswordForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordForm: InitialPasswordForm;
};

function UpdatePassword(props: UpdatePasswordProp): React.ReactElement {
  const { onChangePasswordForm, passwordForm } = props;

  return (
    <form>
      <div className={"mb-3"}>
        <Input_custom_with_type
          input_type={INPUT_TYPES.PASSWORD}
          label={"Password"}
          name={"password"}
          on_change={onChangePasswordForm}
          placeHolder={"Enter password"}
          value={passwordForm.password}
        />
      </div>
      <div className={"mb-6"}>
        <Input_custom_with_type
          input_type={INPUT_TYPES.PASSWORD}
          label={"New Password"}
          name={"new_password"}
          on_change={onChangePasswordForm}
          placeHolder={"Enter password"}
          value={passwordForm.new_password}
        />
      </div>
      <PrimaryButton className={"bg-primary text-white w-full"} type={"submit"}>
        {" "}
        Save Changes
      </PrimaryButton>
    </form>
  );
}
