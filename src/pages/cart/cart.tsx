import { ReactElement, useState } from "react";

import CartLeft from "@/components/ui/cart/cart_left.tsx";
import CartSummary from "@/components/ui/cart/cart_summary.tsx";
import Modal from "@/components/layouts/modal.tsx";
import Promo from "@/components/ui/promo/promo.tsx";
import DrawerUI from "@/components/layouts/drawer.tsx";
import Checkout from "@/pages/checkout/checkout.tsx";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";

export default function Cart({
  onClose,
}: {
  onClose?: () => void;
}): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);

  return (
    <div>
      <div className={"flex flex-col lg:flex-row gap-8 lg:gap-[48px]"}>
        <DrawerUI
          isOpen={isOpenCheckout}
          onClose={() => setIsOpenCheckout(false)}
        >
          <Checkout closeCheckout={() => setIsOpenCheckout(false)} />
        </DrawerUI>
        {onClose && <CartLeft onClose={onClose} />}
        {onClose && (
          <CartSummary
            openPromo={() => setIsOpen(true)}
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
        isOpen={isOpen}
        styles={"pt-6 lg:p-[32px]"}
        onClose={() => setIsOpen(false)}
      >
        <Promo />
      </Modal>
    </div>
  );
}
