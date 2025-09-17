import { JSX, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: JSX.Element;
}

interface TokenPayload {
  exp: number;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps): ReactElement {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate replace={true} to={"/sign-in"} />;

  try {
    const { exp } = jwtDecode<TokenPayload>(token);

    // if expired, redirect to sign in
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");

      return <Navigate replace={true} to={"/sign-in"} />;
    }
  } catch (e) {
    localStorage.removeItem("token");

    return <Navigate replace={true} to={"/sign-in"} />;
  }

  return children;
}
