import { ReactElement, useState } from "react";

import PrimaryButton from "@/components/ui/button/primary_button.tsx";
import { ProductItem } from "@/types";
import Modal from "@/components/layouts/modal.tsx";
import { useCart } from "@/context/cart.tsx";
import { useAddToCartMutation } from "@/api/cart/cartApi.ts";

export default function ProductButtonsFunction({
  product,
}: {
  product: ProductItem;
}): ReactElement {
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = () => {
    console.log(quantity);

    addToCart({ productId: product.productId, quantity: quantity });
    setIsOpen(true);
  };

  // const handleBuyNow = () => {
  //   console.log("Buy now:", { quantity });
  // };

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => Math.max(1, q - 1));

  const { setIsOpenCart } = useCart();

  return (
    <div className="flex flex-col gap-4 items-center">
      <Modal
        cancelText={"Close"}
        confirmText={"View Cart"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpenCart(true)}
      >
        <div className={"flex flex-col items-center gap-4 p-4"}>
          <img
            alt={"check"}
            className={"w-[98px] h-[98px]"}
            src={"/modal/check-square.png"}
          />
          <div className={"flex flex-col gap-2 items-center"}>
            <p className={"text-xl lg:text-3xl"}>Successfully!</p>
            <p className={"text-sm lg:text-xl text-[#7F7F7F] text-center"}>
              Product &#34;{product.name.toUpperCase()}&#34; added to the cart!
            </p>
          </div>
        </div>
      </Modal>
      {/* Quantity Selector */}
      <div className={"flex gap-4 items-center w-full"}>
        <div className="flex gap-4 w-full">
          {/* Add to Cart */}
          <PrimaryButton
            className={"w-full flex-3/5"}
            content="Add To Cart"
            type={"button"}
            onPress={handleAddToCart}
          />

          <div
            className={
              "flex items-center justify-between border border-primary flex-2/5"
            }
          >
            <button
              className="px-3 py-2 text-lg cursor-pointer"
              disabled={quantity === 1}
              onClick={decrease}
            >
              −
            </button>
            <span className="px-4 py-2">{quantity}</span>
            <button
              className="px-3 py-2 text-lg cursor-pointer"
              onClick={increase}
            >
              +
            </button>
          </div>
        </div>
      </div>
      {/* Buy It Now */}
      {/*<PrimaryButton*/}
      {/*  className={"w-full bg-primary text-white"}*/}
      {/*  content="Buy It Now"*/}
      {/*  type="button"*/}
      {/*  onPress={handleBuyNow}*/}
      {/*/>*/}
    </div>
  );
}
