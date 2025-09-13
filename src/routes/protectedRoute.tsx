import { JSX, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "@heroui/spinner";

import { useValidateTokenQuery } from "@/api/account/accountApi.ts";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps): ReactElement {
  const token = localStorage.getItem("token");

  // skip validate if there is no token
  const { data, isLoading, error } = useValidateTokenQuery(undefined, {
    skip: !token, // => dont call api if there is no token
  });

  // No token -> redirect immediately
  if (!token) return <Navigate replace={true} to={"/sign-in"} />;

  // show spinner until back end validated token
  if (isLoading) return <Spinner color={"primary"} />;

  // if error -> return to sign in
  if (error || !data) {
    localStorage.removeItem("token");

    return <Navigate replace={true} to={"/sign-in"} />;
  }

  // token valid -> show protected page
  return children;
}
