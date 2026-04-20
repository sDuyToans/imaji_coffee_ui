import React, { useState } from "react";
import {
  DISPATCH_ACTION,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { Spinner } from "@heroui/spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PayPalProvider from "@/providers/paypal_provider.tsx";
import {
  useClearCartMutation,
  useClearPromoMutation,
  useClearShippingMutation,
  useGetCartQuery,
} from "@/api/cart/cartApi.ts";
import { checkoutSchema } from "@/libs/yup/checkout_schema.ts";
import { OrderItemRequest, OrderRequest } from "@/types";
import {
  useCreateOrderForPayPalMutation,
  useUpdateOrderStatusMutation,
} from "@/api/order/orderApi.ts";

interface TokenPayload {
  username?: string;
  sub?: string;
}

export default function PaypalCheckout(): React.ReactElement {
  return (
    <div className={"w-full"}>
      <PayPalProvider>
        <PaymentContainer />
      </PayPalProvider>
    </div>
  );
}

function PaymentContainer(): React.ReactElement {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);
  const { data: cart } = useGetCartQuery();
  const cartItems = cart?.cartItems ?? [];
  const token = localStorage.getItem("token");
  const [createOrderForPayPal] = useCreateOrderForPayPalMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [clearCart] = useClearCartMutation();
  const [clearPromo] = useClearPromoMutation();
  const [clearShip] = useClearShippingMutation();
  const navigate = useNavigate();
  let emailFromToken = "";

  if (token) {
    const payload = jwtDecode<TokenPayload>(token);

    emailFromToken = payload.sub || "";
  }
  const methods = useForm({
    mode: "onBlur", // validate only on Blur not on every key stroke
    shouldUnregister: false, // unmount fields not needed
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      userId: null,
      email: emailFromToken,
      shipMethodId: 1,
      shippingAddress: {
        name: "",
        country: "",
        province: "",
        city: "",
        postalCode: "",
        street: "",
        apartment: "",
        phoneNumber: "",
      },
      paymentMethod: "paypal",
      items: [],
    },
  });

  const { getValues } = methods;

  const tax = cart?.tax; // Or backend value if you send tax directly
  const total: number = cart?.total || 0;
  const shipping = cart?.shipping;
  const discount = cart?.discount;

  // currency selector 'USD' and 'EUR'
  const onCurrencyChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setCurrency(value);
    dispatch({
      type: DISPATCH_ACTION.RESET_OPTIONS,
      value: {
        ...options,
        currency: currency,
      },
    });
  };
  let totalStr = total.toString();
  // onCreateOrderPayPal
  const onCreateOrder = async (data: any, actions: any) => {
    const payload: OrderRequest = {
      userId: 1,
      email: getValues("email"),
      shippingAddress: {
        ...getValues("shippingAddress"),
        isDefault: !!getValues("shippingAddress.isDefault"),
      },
      totalAmount: total,
      taxAmount: tax ?? 0,
      shippingAmount: shipping ?? 0,
      discountAmount: discount ?? 0,
      currency: "USD",
      paymentMethod: data.paymentSource,
      shipMethodId: getValues("shipMethodId"),
      items: cartItems.map((item: OrderItemRequest) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    // create order here, but the back end is for using Stripe,  we'll need to modify it a bit
    await createOrderForPayPal(payload).unwrap();

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: { totalStr },
          },
        },
      ],
    });
  };

  // on Approve Order Paypal
  const onApproveOrder = async (data: any) => {
    // update order status
    await updateOrderStatus({ orderId: data.orderID, status: "PAID" });

    // clear cart, promo, and ship
    await clearCart();
    await clearPromo();
    await clearShip().unwrap();

    // navigate to the success order page
    toast.success("Order Successfully!");
    navigate(`/completed-checkout/${data.orderID}`);
  };

  if (isPending) {
    return <Spinner color={"primary"} />;
  }

  return (
    <div className={"w-full"}>
      <div>
        <label htmlFor={"cur"}>Currency Selection:</label> <br />
        <select id="cur" value={currency} onChange={onCurrencyChange}>
          <option value={"USD"}>USD</option>
          <option value={"EUR"}>EUR</option>
        </select>
      </div>
      <PayPalButtons
        className={"w-1/4"}
        createOrder={(data, actions) => onCreateOrder(data, actions)}
        style={{ layout: "vertical" }}
        onApprove={(data) => onApproveOrder(data)}
      />
    </div>
  );
}
