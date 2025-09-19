import { ReactElement, useState } from "react";

import CartLeft from "@/components/ui/cart/cart_left.tsx";
import CartSummary from "@/components/ui/cart/cart_summary.tsx";
import Modal from "@/components/layouts/modal.tsx";
import Promo from "@/components/ui/promo/promo.tsx";
import DrawerUI from "@/components/layouts/drawer.tsx";
import Checkout from "@/pages/checkout/checkout.tsx";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";
import { usePromo } from "@/context/promo.tsx";
import {
  useClearShippingMutation,
  useGetCartQuery,
} from "@/api/cart/cartApi.ts";

export default function Cart({
  onClose,
}: {
  onClose?: () => void;
}): ReactElement {
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);
  const { isOpenPromoModal, openPromoModal, closePromoModal } = usePromo();
  const { data, refetch } = useGetCartQuery();
  const [clearShipping] = useClearShippingMutation();
  const cartItems = data?.cartItems ?? [];
  const handleCloseCheckout = async () => {
    try {
      await clearShipping().unwrap();
      await refetch();
      setIsOpenCheckout(false);
    } catch (e) {
      console.log("There is an error in clear the shipping method", e);
    }
  };

  return (
    <div>
      <div className={"flex flex-col lg:flex-row gap-8 lg:gap-[48px]"}>
        <DrawerUI isOpen={isOpenCheckout} onClose={handleCloseCheckout}>
          {cartItems && cartItems.length > 0 ? (
            <Checkout closeCheckout={handleCloseCheckout} />
          ) : (
            <p>There is nothing to display, please order and come back.</p>
          )}
        </DrawerUI>
        {onClose && <CartLeft onClose={handleCloseCheckout} />}
        {onClose && cartItems && cartItems.length > 0 && (
          <CartSummary
            openPromo={openPromoModal}
            summaryBtnContent={"Checkout"}
            onClose={handleCloseCheckout}
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
