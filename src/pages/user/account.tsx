import type { ReactElement } from "react";

import DefaultLayout from "@/layouts/default.tsx";

export default function Account(): ReactElement {
  return (
    <DefaultLayout>
      <AccountContainer />
    </DefaultLayout>
  );
}

function AccountContainer(): ReactElement {
  return (
    <div className={"h-[90dvh]"}>
      <h1 className={"text-3xl lg:text-7xl"}>Account page</h1>
      <p>Waiting for v2 ...</p>
    </div>
  );
}
