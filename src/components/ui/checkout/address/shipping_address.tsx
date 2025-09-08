import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@heroui/input";
import PhoneInput from "react-phone-input-2";
import { Checkbox } from "@heroui/checkbox";

import { CheckoutData } from "@/types";
import ErrorText from "@/components/ui/erros/error_text.tsx";
import CountrySelect from "@/components/ui/checkout/address/country_select.tsx";

export default function ShippingAddress(): ReactElement {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CheckoutData>();

  return (
    <div className={"flex flex-col gap-6 lg:gap-8"}>
      <h3 className={"text-3xl font-medium"}>Shipping Address</h3>
      <div className={"flex flex-col gap-4 lg:gap-6"}>
        <div className={"flex flex-col gap-4 lg:flex-row lg:gap-6"}>
          <div className={"flex flex-col gap-1"}>
            <Input
              classNames={{
                inputWrapper: "rounded-none  border border-primary bg-white",
                input: "rounded-none bg-white",
              }}
              placeholder={"Name"}
              {...register("shippingAddress.name")}
            />
            {errors.shippingAddress?.name?.message && (
              <ErrorText message={errors.shippingAddress.name.message} />
            )}
          </div>
          <div className={"flex flex-col gap-1"}>
            <Input
              classNames={{
                inputWrapper: "rounded-none  border border-primary bg-white",
                input: "rounded-none bg-white",
              }}
              placeholder={"Apartment, suite, etc"}
              {...register("shippingAddress.apartment")}
            />
          </div>
        </div>
        <div className={"grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"}>
          <div className={"flex flex-col gap-1"}>
            <CountrySelect name={"shippingAddress.country"} />
            {errors.shippingAddress?.country?.message && (
              <ErrorText message={errors.shippingAddress.country.message} />
            )}
          </div>

          <div className={"flex flex-col gap-1"}>
            <Input
              classNames={{
                inputWrapper: "rounded-none  border border-primary bg-white",
                input: "rounded-none bg-white",
              }}
              placeholder={"Province"}
              {...register("shippingAddress.province")}
            />
            {errors.shippingAddress?.province?.message && (
              <ErrorText message={errors.shippingAddress.province.message} />
            )}
          </div>

          <div className={"flex flex-col gap-1"}>
            <Input
              classNames={{
                inputWrapper: "rounded-none  border border-primary bg-white",
                input: "rounded-none bg-white",
              }}
              placeholder={"City"}
              {...register("shippingAddress.city")}
            />
            {errors.shippingAddress?.city?.message && (
              <ErrorText message={errors.shippingAddress.city.message} />
            )}
          </div>

          <div className={"flex flex-col gap-1"}>
            <Input
              classNames={{
                inputWrapper: "rounded-none  border border-primary bg-white",
                input: "rounded-none bg-white",
              }}
              placeholder={"Postal Code"}
              {...register("shippingAddress.postalCode")}
            />
            {errors.shippingAddress?.postalCode?.message && (
              <ErrorText message={errors.shippingAddress.postalCode.message} />
            )}
          </div>
        </div>

        <div className={"flex flex-col gap-1"}>
          <Input
            classNames={{
              inputWrapper: "rounded-none  border border-primary bg-white",
              input: "rounded-none bg-white",
            }}
            placeholder={"Address detail"}
            {...register("shippingAddress.street")}
          />
          {errors.shippingAddress?.street?.message && (
            <ErrorText message={errors.shippingAddress.street.message} />
          )}
        </div>
        <div className={"flex flex-col gap-1"}>
          <Controller
            control={control}
            name={"shippingAddress.phoneNumber"}
            render={({ field }) => (
              <PhoneInput
                country={"ca"}
                inputStyle={{ width: "100%" }}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          {errors.shippingAddress?.phoneNumber?.message && (
            <ErrorText message={errors.shippingAddress.phoneNumber.message} />
          )}
        </div>
        <Checkbox color={"primary"} defaultSelected={false}>
          Set as default address
        </Checkbox>
      </div>
    </div>
  );
}
