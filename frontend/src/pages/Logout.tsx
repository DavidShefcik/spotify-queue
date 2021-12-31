import { useContext, useEffect } from "react";

import Page from "~/components/Page";
import FullPageLoading from "~/components/FullPageLoading";
import { api } from "~/utils/api";
import SessionContext from "~/context/SessionContext";

export default function LogoutPage() {
  const { setSession } = useContext(SessionContext);

  useEffect(() => {
    (async () => {
      try {
        await api.post("/auth/logout");

        setSession({
          loggedIn: false,
          user: null,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Page title="Logout" requireAuth>
      <FullPageLoading />
    </Page>
  );
}
