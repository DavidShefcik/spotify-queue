import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Page from "~/components/Page";
import FullPageLoading from "~/components/FullPageLoading";
import { api } from "~/utils/api";
import SessionContext from "~/context/SessionContext";

export default function LogoutPage() {
  const { setSession } = useContext(SessionContext);

  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    console.log("Logout");
  };

  return (
    <Page title="Logout" requireAuth>
      <FullPageLoading />
    </Page>
  );
}
