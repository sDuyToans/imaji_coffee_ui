import { ReactElement, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@heroui/input";
import { FaChevronRight } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { Chip } from "@heroui/chip";

import { removePromo, selectCartSummary } from "@/features/cart/cartSlice.ts";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";

export default function CartSummary({
  onClose,
  openPromo,
  children,
}: {
  onClose: () => void;
  openPromo: () => void;
  summaryBtnContent: string;
  children?: ReactNode;
}): ReactElement {
  const { subtotal, tax, total, promoCode, discount } =
    useSelector(selectCartSummary);
  const dispatch = useDispatch();
  const handleClearDiscount = () => {
    dispatch(removePromo());
  };

  return (
    <div
      className={
        "flex-4/12 bg-[#FCF7EF] px-5 py-5 lg:px-[48px] lg:pt-[80px] flex flex-col gap-[48px] h-dvh"
      }
    >
      <p className={"text-4xl hidden lg:block dark:text-primary"}>
        Cart Summary
      </p>
      <div className={"flex flex-col gap-6"}>
        <div className={"flex justify-between items-center"}>
          <span className={"text-[#7F7F7F]"}>Subtotal</span>
          <span className={"text-base"}>${subtotal}</span>
        </div>
        <div className={"flex justify-between items-center"}>
          <span className={"text-[#7F7F7F]"}>Tax (10%)</span>
          <span className={"text-base"}>${tax}</span>
        </div>
        <div className={"flex flex-col gap-2"}>
          <span className={"text-[#7F7F7F]"}>Promo Code</span>
          <Input
            classNames={{ inputWrapper: "rounded-none", input: "rounded-none" }}
            placeholder={"Enter code"}
          />
          <PrimaryButton
            className={"py-3 px-4 w-full dark:border-black"}
            type={"button"}
            onPress={openPromo}
          >
            <div className={"flex items-center"}>
              <p className={"dark:text-primary"}>Choose Discount Promo</p>
              <FaChevronRight />
            </div>
          </PrimaryButton>
          {discount !== 0 && (
            <Chip onClose={handleClearDiscount}>
              <p>
                {promoCode} : {discount} $
              </p>
            </Chip>
          )}
        </div>
      </div>
      <div className={"mt-auto pb-[80px] flex flex-col gap-[30px]"}>
        <div className={"flex justify-between items-center"}>
          <span className={"text-[#7F7F7F]"}>Total</span>
          <div>
            {!discount ? (
              <span className={"text-base"}>${total}</span>
            ) : (
              <div className={"flex flex-col gap-2"}>
                <span className={"text-2xl"}>${total}</span>
                <span className={"text-base line-through text-dark-grey-70"}>
                  ${subtotal + tax}
                </span>
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
      <PrimaryButton className={"lg:hidden"} type={"button"} onPress={onClose}>
        <div className={"flex items-center gap-2"}>
          <GoArrowLeft size={25} />
          <p>Back</p>
        </div>
      </PrimaryButton>
    </div>
  );
}
