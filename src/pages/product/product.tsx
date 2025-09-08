import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "@heroui/spinner";

import DefaultLayout from "@/layouts/default.tsx";
import { useGetProductByProductIdQuery } from "@/api/products/productsApi.ts";
import Detail from "@/components/ui/detail/detail.tsx";
import MayInterest from "@/components/ui/product/interest.tsx";

export default function Product(): ReactElement {
  const { productId } = useParams<{ productId: string }>();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByProductIdQuery(Number(productId));

  if (isLoading) {
    return (
      <DefaultLayout>
        <Spinner color={"primary"} />
      </DefaultLayout>
    );
  }

  if (error) {
    return <DefaultLayout>Failed to load product</DefaultLayout>;
  }

  return (
    <DefaultLayout>
      <div className={"px-5 lg:px-[124px]"}>
        <Detail product={product} />
      </div>
      <MayInterest category={product.category} excludedId={product.productId} />
    </DefaultLayout>
  );
}
