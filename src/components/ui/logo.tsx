import type { ReactElement } from "react";

export default function Logo(): ReactElement {
  return (
    <div className={"flex items-center"}>
      <h4 className={"text-2xl lg:text-4xl"}>
        <span className={"text-secondary dark:text-white"}>IMAJI</span>
        <span className={"text-primary dark:text-secondary"}> Coffee.</span>
      </h4>
    </div>
  );
}
