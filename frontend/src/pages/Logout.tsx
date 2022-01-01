import { useContext, useEffect } from "react";

import Page from "~/components/Page";
import FullPageLoading from "~/components/FullPageLoading";
import { api } from "~/utils/api";
import SessionContext from "~/context/SessionContext";

export default function LogoutPage() {
  const { setSession } = useContext(SessionContext);

  useEffect(() => {
    (async () => {
      await api.logout();
      setSession({
        loggedIn: false,
        user: null,
      });
    })();
  }, []);

  return (
    <Page title="Logout" requireAuth>
      <FullPageLoading />
    </Page>
  );
}
