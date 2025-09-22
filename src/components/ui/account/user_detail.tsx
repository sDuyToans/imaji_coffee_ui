import { ReactElement } from "react";
import { Spinner } from "@heroui/spinner";
import { Link } from "@heroui/link";

import { useGetUserInfoQuery } from "@/api/account/accountApi.ts";
import { UserDto } from "@/types";

export default function UserDetail(): ReactElement {
  const { data, isLoading } = useGetUserInfoQuery();

  if (isLoading) return <Spinner color={"primary"} />;

  let userData: UserDto = data ?? {
    userId: -1,
    username: "Jhon Santos",
    email: "imajidigitalstudio@gmail.com",
    phone: "(702) 555-0122",
  };

  return (
    <div
      className={
        "flex flex-col gap-6 lg:gap-7 border border-[#E3E3E3] p-6 lg:p-8"
      }
    >
      <h3 className={"text-2xl lg:text-3xl"}>Account Detail</h3>
      <div className={"flex flex-col gap-[12px]"}>
        <p className={"text-xl font-medium"}>{userData.username}</p>
        <p className={"text-lg lg:text-xl"}>{userData.email}</p>
        <p className={"text-lg lg:text-xl"}>{userData.phone}</p>
      </div>
      <Link className={"text-primary"} href={"/account/setting"}>
        Account Setting
      </Link>
    </div>
  );
}
