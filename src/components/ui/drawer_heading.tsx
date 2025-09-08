import { ReactElement } from "react";
import { Link } from "@heroui/link";
import { Image } from "@heroui/image";

import PageHeading from "@/components/ui/page_heading.tsx";

export default function DrawerHeading({
  heading,
}: {
  heading: string;
}): ReactElement {
  return (
    <div className={"flex gap-8 justify-between items-center lg:items-start"}>
      <PageHeading
        className={"text-left !text5xl lg:!text-7xl"}
        title={heading}
      />
      <div className={"flex flex-col items-start gap-[24px]"}>
        <h6 className={"hidden lg:block text-lg"}>Delivery Order</h6>
        <div className={"hidden lg:flex flex-row gap-6 w-[288px]"}>
          <Link href={"#"}>
            <Image
              alt={"app_store"}
              className={"rounded-none"}
              src={"/footer/logo_app_store.png"}
            />
          </Link>
          <Link href={"#"}>
            <Image
              alt={"app_store"}
              className={"rounded-none"}
              src={"/footer/google_play.png"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
