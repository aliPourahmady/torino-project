import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function LoginTrigger() {
  const params = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!params.get("login")) return;
    const redirect = params.get("redirectTo");
    const safe =
      redirect && redirect.startsWith("/") && !redirect.startsWith("//")
        ? redirect
        : null;
  }, [params, dispatch]);

  return null;
}

export default LoginTrigger;
