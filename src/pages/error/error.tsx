import type { ReactElement } from "react";

import { Link } from "react-router-dom";

import DefaultLayout from "@/layouts/default.tsx";

export default function Error(): ReactElement {
  return (
    <DefaultLayout>
      <div
        className={
          "h-dvh flex flex-col items-center justify-center md:justify-start"
        }
      >
        <div className="error-pg">
          <div className="error-number">
            <div className="number left-coffee">4</div>
            <div className="coffee-mug" />
            <div className="number right-coffee">4</div>
          </div>
          <div className="mean-msg text-center text-md lg:text-3xl">
            Nothing to see here,{" "}
            <Link
              className={
                "dark:text-white border p-3 lg:p-4 hover:border-primary hover:bg-primary-surface-light hover:text-dark-grey-70"
              }
              to="/"
            >
              Go back Home!
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
