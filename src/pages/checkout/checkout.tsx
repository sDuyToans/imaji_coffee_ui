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
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import DrawerHeading from "@/components/ui/drawer_heading.tsx";
import OrderItemsSummary from "@/components/ui/order/order_items_summary.tsx";
import PrimaryButton from "@/components/ui/button/primary_button.tsx";
import Address from "@/components/ui/checkout/address.tsx";
import Shipping from "@/components/ui/checkout/shipping.tsx";
import Payment from "@/components/ui/checkout/payment.tsx";
import { checkoutSchema } from "@/libs/yup/checkout_schema.ts";
import { ElementErrors } from "@/types";
import {
  clearCart,
  removePromo,
  selectCartItem,
  selectCartSummary,
} from "@/features/cart/cartSlice.ts";
import {
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
} from "@/api/order/orderApi.ts";
import { useCart } from "@/context/cart.tsx";

enum Step {
  Address = 0,
  Shipping = 1,
  Payment = 2,
}

export default function Checkout({
  closeCheckout,
}: {
  closeCheckout: () => void;
}): ReactElement {
  const [step, setStep] = useState<Step>(Step.Address);
  const cartItems = useSelector(selectCartItem);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardName, setCardName] = useState("");
  const { total } = useSelector(selectCartSummary);
  const dispatch = useDispatch();
  const [createOrder] = useCreateOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const { setIsOpenCart } = useCart();

  const [elementErrors, setElementErrors] = useState<ElementErrors>({
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const elements = useElements();
  const stripe = useStripe();
  const methods = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      userId: null,
      email: "",
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

  const { getValues } = methods;

  const handleNext = async (data: any) => {
    if (step === Step.Address) setStep(Step.Shipping);
    else if (step === Step.Shipping) setStep(Step.Payment);
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
      // 1. Create order and get client secret
      const orderRes = await createOrder({
        userId: 1,
        email: getValues("email"),
        shippingAddress: getValues("shippingAddress"),
        totalAmount: total,
        currency: "USD",
        items: cartItems,
      }).unwrap();

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
        dispatch(clearCart());
        dispatch(removePromo());
        setIsOpenCart(false);
        navigate("/completed-checkout");
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
            {renderStepContent()}
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
                onPress={() => setStep(Step.Address)}
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
                onPress={() => setStep(Step.Shipping)}
              >
                <div className={"flex items-center gap-2"}>
                  <GoArrowLeft size={25} />
                  <p>Back</p>
                </div>
              </PrimaryButton>
            )}
          </div>
          <OrderItemsSummary openPromo={() => {}} onClose={closeCheckout}>
            {step === Step.Address && (
              <PrimaryButton
                className={"w-full bg-primary text-white"}
                content={"Process to Shipping"}
                type={"button"}
                onPress={methods.handleSubmit(() => setStep(Step.Shipping))}
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
