import { ReactElement } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { Spinner } from "@heroui/spinner";

import { ElementErrors, StripeCheckoutProps } from "@/types";
import ErrorText from "@/components/ui/erros/error_text.tsx";

export default function StripeCheckout({
  elementErrors,
  setElementErrors,
  isProcessing,
  setCardName,
  errorMessage,
}: StripeCheckoutProps): ReactElement {
  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const fieldBaseClass =
    "h-[42px] w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300";
  const fieldErrorClass =
    "border-red-400 dark:border-red-500 focus:ring-red-500";
  const fieldValidClass =
    "border-primary dark:border-light focus:ring-dark dark:focus:ring-lighter";

  const getClassForElements = (field: keyof ElementErrors) =>
    `${fieldBaseClass} ${elementErrors[field] ? fieldErrorClass : fieldValidClass}`;

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#000",
        backgroundColor: "#FFF",
      },
      invalid: {
        color: "#F87171",
        backgroundColor: "#FFF",
      },
    },
  };

  function handleCardChange(field: string, event: any) {
    setElementErrors((prev) => ({
      ...prev,
      [field]: event.error ? event.error.message : "",
    }));
  }

  return (
    <div>
      <Spinner
        className={isProcessing ? "visible" : "hidden"}
        color={"primary"}
      >
        Processing payment... Don&#39;t refresh the page
      </Spinner>
      {errorMessage && <ErrorText message={errorMessage} />}
      <div
        className={`${isProcessing ? "hidden" : "visible"} flex flex-col lg:flex-row gap-4 lg:gap-6 items-center`}
      >
        <div
          className={
            "flex flex-col lg:flex-row gap-4 lg:gap-6 items-center flex-3/5"
          }
        >
          <div className={"flex-1/2"}>
            <label className={labelStyle} htmlFor="cardNumber">
              Card Number
            </label>
            <CardNumberElement
              className={getClassForElements("cardNumber")}
              options={elementOptions}
              onChange={(event) => handleCardChange("cardNumber", event)}
            />
            {elementErrors.cardNumber && (
              <ErrorText message={elementErrors.cardNumber} />
            )}
          </div>
          <div>
            <label className={labelStyle} htmlFor="cardNumber">
              Card Holder Name
            </label>
            <input
              className="w-full px-3 py-2 text-base border rounded-md border-primary focus:ring focus:ring-dark focus:outline-none"
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>
        </div>
        <div
          className={"flex lg:flex-row gap-4 lg:gap-6 items-center flex-2/5"}
        >
          <div className={"flex-1/2"}>
            <label className={labelStyle} htmlFor="cardNumber">
              Card Expiry
            </label>
            <CardExpiryElement
              className={getClassForElements("cardExpiry")}
              options={elementOptions}
              onChange={(event) => handleCardChange("cardExpiry", event)}
            />
            {elementErrors.cardExpiry && (
              <ErrorText message={elementErrors.cardExpiry} />
            )}
          </div>
          <div className={"flex-1/2"}>
            <label className={labelStyle} htmlFor="cardNumber">
              Card CVC
            </label>
            <CardCvcElement
              className={getClassForElements("cardCVC")}
              options={elementOptions}
              onChange={(event) => handleCardChange("cardCVC", event)}
            />
            {elementErrors.cardCVC && (
              <ErrorText message={elementErrors.cardCVC} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
