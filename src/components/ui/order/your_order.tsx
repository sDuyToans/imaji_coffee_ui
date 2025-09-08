import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Image } from "@heroui/image";

import { CartItem, selectCartItem } from "@/features/cart/cartSlice.ts";

export default function YourOrder(): ReactElement {
  const cartItems: CartItem[] = useSelector(selectCartItem);

  return (
    <div className={"flex flex-col gap-6"}>
      <h2 className={"text-4xl text-left"}>Your Order</h2>
      <div className={"flex flex-col gap-4"}>
        {cartItems &&
          cartItems.map((i) => (
            <div
              key={i.productId}
              className={
                "pb-4 border-b border-gray-200 flex justify-between items-center"
              }
            >
              <div className={"flex items-center gap-4  w-full"}>
                <Image
                  alt={i.name}
                  classNames={{
                    wrapper: "w-full h-full",
                    img: "w-[85px] h-[84px] rounded-none",
                  }}
                  src={i.images.find((i) => i.isMain)?.imageUrl}
                />
                <div className={"flex flex-col gap-4 w-full"}>
                  <div className={"flex flex-col gap-1"}>
                    <p className={"text-base font-medium"}>
                      {i.name.toUpperCase()}
                    </p>
                    <p>{i.category.toUpperCase()}</p>
                  </div>
                  <div className={"flex justify-between"}>
                    <p>
                      {i.cartQuantity} x ${i.price},00
                    </p>
                    <div className={"lg:hidden"}>
                      ${(i.cartQuantity * i.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              <div className={"hidden lg:block"}>
                ${(i.cartQuantity * i.price).toFixed(2)}
              </div>
            </div>
          ))}
      </div>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex justify-between items-center"}>
          <p className={"text-xl lg:text-2xl font-medium"}>Subtotal</p>
          <p className={"text-xl lg:text-2xl font-medium"}>$13,00</p>
        </div>
        <div className={"flex justify-between items-center"}>
          <p className={"text-base lg:text-xl font-light"}>Tax (10%)</p>
          <p className={"text-base lg:text-xl font-light"}>$13,00</p>
        </div>
        <div className={"flex justify-between items-center"}>
          <p className={"text-base lg:text-xl font-light"}>Discount</p>
          <p className={"text-base lg:text-xl font-light"}>$13,00</p>
        </div>
        <div className={"flex justify-between items-center"}>
          <p className={"text-base lg:text-xl font-light"}>Shipping</p>
          <p className={"text-base lg:text-xl font-light"}>$13,00</p>
        </div>
        <div className={"flex justify-between items-center"}>
          <p className={"text-3xl lg:text-4xl font-medium"}>Grand Total</p>
          <p className={"text-3xl lg:text-4xl font-medium"}>$15,4</p>
        </div>
      </div>
    </div>
  );
}
