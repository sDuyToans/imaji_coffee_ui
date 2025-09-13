import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";

import CartLeft from "@/components/ui/cart/cart_left.tsx";
import CartSummary from "@/components/ui/cart/cart_summary.tsx";
import Modal from "@/components/layouts/modal.tsx";
import Promo from "@/components/ui/promo/promo.tsx";
import DrawerUI from "@/components/layouts/drawer.tsx";
import Checkout from "@/pages/checkout/checkout.tsx";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";
import { usePromo } from "@/context/promo.tsx";
import { selectCartItem } from "@/features/cart/cartSlice.ts";

export default function Cart({
  onClose,
}: {
  onClose?: () => void;
}): ReactElement {
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);
  const { isOpenPromoModal, openPromoModal, closePromoModal } = usePromo();
  const cartItems = useSelector(selectCartItem);

  return (
    <div>
      <div className={"flex flex-col lg:flex-row gap-8 lg:gap-[48px]"}>
        <DrawerUI
          isOpen={isOpenCheckout}
          onClose={() => setIsOpenCheckout(false)}
        >
          {cartItems.length > 0 ? (
            <Checkout closeCheckout={() => setIsOpenCheckout(false)} />
          ) : (
            <p>There is nothing to display, please order and come back.</p>
          )}
        </DrawerUI>
        {onClose && <CartLeft onClose={onClose} />}
        {onClose && cartItems.length > 0 && (
          <CartSummary
            openPromo={openPromoModal}
            summaryBtnContent={"Checkout"}
            onClose={onClose}
          >
            <PrimaryButton
              className={"w-full bg-primary text-white"}
              content={"Checkout"}
              type={"button"}
              onPress={() => setIsOpenCheckout(true)}
            />
          </CartSummary>
        )}
      </div>
      <Modal
        cancelText={"cancel"}
        confirmText={"confirm"}
        haveFooter={false}
        isOpen={isOpenPromoModal}
        styles={"pt-6 lg:p-[32px]"}
        onClose={closePromoModal}
      >
        <Promo />
      </Modal>
    </div>
  );
}
