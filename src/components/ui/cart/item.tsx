import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { Image } from "@heroui/image";
import { IoIosClose } from "react-icons/io";

import {
  CartItem,
  removeFromCart,
  updateQuantity,
} from "@/features/cart/cartSlice.ts";

export default function Item({ item }: { item: CartItem }): ReactElement {
  const dispatch = useDispatch();

  const increase = () =>
    dispatch(
      updateQuantity({
        productId: item.productId,
        quantity: item.cartQuantity + 1,
      }),
    );

  const decrease = () => {
    dispatch(
      updateQuantity({
        productId: item.productId,
        quantity: item.cartQuantity - 1,
      }),
    );
  };

  const remove = () => {
    dispatch(removeFromCart(item.productId));
  };

  return (
    <div className="flex flex-col md:flex-row gap-[30px] items-center border-b border-neutral-300 py-6 ">
      {/* Product */}
      <div className="flex flex-3/5 gap-4 items-center">
        <div className={"w-1/3 md:w-1/2 flex items-start"}>
          <Image
            alt={"hero img"}
            className="rounded-none w-full h-[107.5px] md:h-[91.95px] md:w-[120px] object-cover"
            src={item.images.find((im) => im.isMain)?.imageUrl}
          />
        </div>
        <div className="flex flex-col w-2/3">
          <p className="text-lg lg:text-xl">{item.name.toUpperCase()}</p>
          <p className="text-sm text-[#7F7F7F]">
            IMAJI COFFEE {item.category.toUpperCase()}
          </p>
          <div className="block md:hidden flex-1/5 text-lg">
            ${item.price}.00
          </div>
          <div className={"flex items-center gap-4 justify-between md:hidden"}>
            <div className="flex-1/5">
              <div className="flex items-center justify-between border border-black w-[80px] dark:border-primary">
                <button
                  className="px-2 py-1 text-lg cursor-pointer"
                  disabled={item.cartQuantity === 1}
                  onClick={decrease}
                >
                  −
                </button>
                <span className="px-2 py-1">{item.cartQuantity}</span>
                <button
                  className="px-2 py-1 text-lg cursor-pointer"
                  onClick={increase}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex-1/5 text-lg">
              ${(item.price * item.cartQuantity).toFixed(2)}
            </div>
            <div className="w-[30px] text-center">
              <button className="text-black cursor-pointer" onClick={remove}>
                <IoIosClose className={"dark:text-primary"} size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="hidden md:block flex-1/5 text-lg">${item.price}.00</div>

      {/* Quantity */}
      <div className="hidden md:block flex-1/5">
        <div className="flex items-center justify-between border border-black w-[120px] dark:border-primary">
          <button
            className="px-3 py-2 text-lg cursor-pointer"
            disabled={item.cartQuantity === 1}
            onClick={decrease}
          >
            −
          </button>
          <span className="px-4 py-2">{item.cartQuantity}</span>
          <button
            className="px-3 py-2 text-lg cursor-pointer"
            onClick={increase}
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="hidden md:block flex-1/5 text-lg">
        ${(item.price * item.cartQuantity).toFixed(2)}
      </div>

      {/* Delete */}
      <div className="hidden md:block w-[50px] text-center">
        <button className="text-black cursor-pointer" onClick={remove}>
          <IoIosClose className={"dark:text-primary"} size={28} />
        </button>
      </div>
    </div>
  );
}
