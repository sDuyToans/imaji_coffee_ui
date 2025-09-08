import { ReactElement } from "react";

export default function SuccessHeading(): ReactElement {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <p className={"text-base text-center"}>
        The order confirmation has been sent to{" "}
        <span className={"text-primary"}>imajidigitalstudio@gmail.com</span>
      </p>
    </div>
  );
}
