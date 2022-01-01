import { ReactChild, useState, useEffect } from "react";

import SessionContext, { session } from "./SessionContext";
import FullPageLoading from "~/components/FullPageLoading";
import { api } from "~/utils/api";

interface Props {
  children: ReactChild;
}

export default function GlobalContextProvider({ children }: Props) {
  // Shared
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // Session check
      const { error, response } = await api.authCheck();

      if (error) {
        session.logout();
      } else if (response) {
        session.login(response);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {loading ? <FullPageLoading /> : children}
    </SessionContext.Provider>
  );
}
