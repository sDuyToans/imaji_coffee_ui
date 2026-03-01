import { ReactElement, useState } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

import DrawerHeading from "@/components/ui/drawer_heading.tsx";
import OrderItemsSummary from "@/components/ui/order/order_items_summary.tsx";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";
import Address from "@/components/ui/checkout/address.tsx";
import Shipping from "@/components/ui/checkout/shipping.tsx";
import Payment from "@/components/ui/checkout/payment.tsx";
import { checkoutSchema } from "@/libs/yup/checkout_schema.ts";
import { ElementErrors, OrderItemRequest, OrderRequest } from "@/types";
import {
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
} from "@/api/order/orderApi.ts";
import { useCart } from "@/context/cart.tsx";
import { usePromo } from "@/context/promo.tsx";
import {
  useClearCartMutation,
  useClearPromoMutation,
  useClearShippingMutation,
  useGetCartQuery,
} from "@/api/cart/cartApi.ts";

enum Step {
  Address = 0,
  Shipping = 1,
  Payment = 2,
}

interface TokenPayload {
  username?: string;
  sub?: string;
}

export default function Checkout({
  closeCheckout,
}: {
  closeCheckout: () => void;
}): ReactElement {
  const [step, setStep] = useState<Step>(Step.Address);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardName, setCardName] = useState("");
  const { data: cart } = useGetCartQuery();
  const cartItems = cart?.cartItems ?? [];

  // const subtotal = cart?.subtotal;
  const tax = cart?.tax; // Or backend value if you send tax directly
  const total = cart?.total || 0;
  const shipping = cart?.shipping;
  const discount = cart?.discount;
  const [createOrder] = useCreateOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [clearCart] = useClearCartMutation();
  const [clearPromo] = useClearPromoMutation();
  const { setIsOpenCart } = useCart();
  const { openPromoModal } = usePromo();
  const [clearShip] = useClearShippingMutation();

  const [elementErrors, setElementErrors] = useState<ElementErrors>({
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const token = localStorage.getItem("token");
  let emailFromToken = "";

  if (token) {
    const payload = jwtDecode<TokenPayload>(token);

    emailFromToken = payload.sub || "";
  }
  const elements = useElements();
  const stripe = useStripe();
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
      paymentMethod: "card",
      items: [],
    },
  });

  const { getValues, trigger } = methods;

  const handleBackStep = async (targetStep: Step) => {
    try {
      await clearShip().unwrap();
      setStep(targetStep);
    } catch (e) {
      console.log("Error in clear shipping", e);
    }
  };

  const handleNext = async () => {
    if (step === Step.Address) {
      const isValid = await trigger([
        "email",
        "shippingAddress.name",
        "shippingAddress.phoneNumber",
        "shippingAddress.street",
        "shippingAddress.city",
        "shippingAddress.country",
        "shippingAddress.postalCode",
        "shippingAddress.province",
        "shippingAddress.apartment",
      ]);

      if (!isValid) return;

      setStep(Step.Shipping);
    } else if (step === Step.Shipping) setStep(Step.Payment);
    else if (step === Step.Payment) {
      await handlePayment();
    }
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      setErrorMessage("Stripe.js it not loaded yet.");

      return;
    }

    if (Object.values(elementErrors).some((error) => error)) {
      setErrorMessage("Please correct the highlighted errors.");

      return;
    }

    setIsProcessing(true);

    try {
      const orderItems: OrderItemRequest[] = cartItems.map(
        (item): OrderItemRequest => ({
          productId: item.productId,
          quantity: item.quantity,
        }),
      );
      // 1. Create order and get client secret
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
        paymentMethod: "card",
        shipMethodId: getValues("shipMethodId"),
        items: orderItems,
      };
      const orderRes = await createOrder(payload).unwrap();

      const { orderId, clientSecret } = orderRes;

      // 2. Confirm payment with Stripe
      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        setErrorMessage("Card details are missing. Please try again");
        setIsProcessing(false);

        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name:
                cardName.trim() !== ""
                  ? cardName
                  : getValues("shippingAddress.name"),
              email: getValues("email"),
              phone: getValues("shippingAddress.phoneNumber"),
              address: {
                line1: getValues("shippingAddress.street"),
                city: getValues("shippingAddress.city"),
                state: getValues("shippingAddress.province"),
                postal_code: getValues("shippingAddress.postalCode"),
                country: getValues("shippingAddress.country"),
              },
            },
          },
        },
      );

      if (error) {
        // Payment failed -> update order status
        await updateOrderStatus({ orderId, status: "PAYMENT_FAILED" });
        toast.error(error.message || "Payment failed. Please try again.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment success -> update oder status
        await updateOrderStatus({ orderId, status: "PAID" });
        toast.success("Payment successful!");
        clearCart();
        clearPromo();
        await clearShip().unwrap();
        setIsOpenCart(false);
        navigate(`/completed-checkout/${orderId}`);
      }
    } catch (error) {
      toast.error("Error processing payment. Please try again later.");
      toast.error("Error creating PaymentIntent: " + error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case Step.Address:
        return <Address />;
      case Step.Shipping:
        return <Shipping />;
      case Step.Payment:
        return (
          <Payment
            elementErrors={elementErrors}
            errorMessage={errorMessage}
            isProcessing={isProcessing}
            setCardName={setCardName}
            setElementErrors={setElementErrors}
          />
        );
    }
  };

  const navigate = useNavigate();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleNext)}>
        <div className={"flex flex-col lg:flex-row gap-8 lg:gap-[48px]"}>
          <div
            className={
              "lg:pt-[80px] lg:pb-[48px] flex flex-col gap-6 lg:gap-[48px] flex-4/5 pt-6  lg:px-[80px] px-5"
            }
          >
            <DrawerHeading heading={"Checkout"} />
            <div>
              <Breadcrumbs>
                <BreadcrumbItem isCurrent={step === Step.Address}>
                  Checkout
                </BreadcrumbItem>
                <BreadcrumbItem isCurrent={step === Step.Shipping}>
                  Shipping
                </BreadcrumbItem>
                <BreadcrumbItem isCurrent={step === Step.Payment}>
                  Payment
                </BreadcrumbItem>
              </Breadcrumbs>
            </div>
            {cartItems.length > 0 ? (
              renderStepContent()
            ) : (
              <p>There is nothing to display, please order and come back</p>
            )}
            {step === Step.Address && (
              <PrimaryButton
                className={"hidden lg:flex"}
                type={"button"}
                onPress={closeCheckout}
              >
                <div className={"flex items-center gap-2"}>
                  <GoArrowLeft size={25} />
                  <p>Back</p>
                </div>
              </PrimaryButton>
            )}
            {step === Step.Shipping && (
              <PrimaryButton
                className={"hidden lg:flex"}
                type={"button"}
                onPress={() => handleBackStep(Step.Address)}
              >
                <div className={"flex items-center gap-2"}>
                  <GoArrowLeft size={25} />
                  <p>Back</p>
                </div>
              </PrimaryButton>
            )}
            {step === Step.Payment && (
              <PrimaryButton
                className={"hidden lg:flex"}
                type={"button"}
                onPress={() => handleBackStep(Step.Shipping)}
              >
                <div className={"flex items-center gap-2"}>
                  <GoArrowLeft size={25} />
                  <p>Back</p>
                </div>
              </PrimaryButton>
            )}
          </div>
          <OrderItemsSummary openPromo={openPromoModal} onClose={closeCheckout}>
            {step === Step.Address && (
              <PrimaryButton
                className={"w-full bg-primary text-white"}
                content={"Process to Shipping"}
                type={"button"}
                onPress={handleNext}
              />
            )}
            {step === Step.Shipping && (
              <PrimaryButton
                className={"w-full bg-primary text-white"}
                content={"Payment"}
                type={"button"}
                onPress={() => setStep(Step.Payment)}
              />
            )}
            {step === Step.Payment && (
              <PrimaryButton
                className={"w-full bg-primary text-white"}
                content={"Complete the Order"}
                type={"submit"}
              />
            )}
          </OrderItemsSummary>
        </div>
      </form>
    </FormProvider>
  );
}
