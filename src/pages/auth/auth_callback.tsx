import { ReactElement, useEffect } from "react";
import { Spinner } from "@heroui/spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setToken } from "@/features/auth/authSlice.ts";

export default function AuthCallback(): ReactElement {
  const location = window.location;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      dispatch(setToken(token));
      navigate("/");
    }
  }, [location, dispatch]);

  return <Spinner color={"primary"} />;
}
