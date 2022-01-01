import { useContext, useEffect } from "react";

import Page from "~/components/Page";
import FullPageLoading from "~/components/FullPageLoading";
import { api } from "~/utils/api";
import SessionContext from "~/context/SessionContext";

export default function LogoutPage() {
  const session = useContext(SessionContext);

  useEffect(() => {
    (async () => {
      await api.logout();
      session.logout();
    })();
  }, []);

  return (
    <Page title="Logout" requireAuth>
      <FullPageLoading />
    </Page>
  );
}
