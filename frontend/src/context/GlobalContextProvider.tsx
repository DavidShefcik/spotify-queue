import { ReactChild, useState, useEffect } from "react";

import SessionContext from "./SessionContext";
import FullPageLoading from "~/components/FullPageLoading";
import { api } from "~/utils/api";

interface Props {
  children: ReactChild;
}

export default function GlobalContextProvider({ children }: Props) {
  // Shared
  const [loading, setLoading] = useState(true);
  // Session
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<Session["user"]>(null);

  const setSession = ({ loggedIn: newLoggedIn, user: newUser }: Session) => {
    setLoggedIn(newLoggedIn);
    setUser(newUser);
  };

  useEffect(() => {
    (async () => {
      // Session check
      const { error, response } = await api.authCheck();

      if (error) {
        setSession({
          loggedIn: false,
          user: null,
        });
      } else if (response) {
        setSession({
          loggedIn: true,
          user: response,
        });
      }

      setLoading(false);
    })();
  }, []);

  return (
    <SessionContext.Provider
      value={{ session: { loggedIn, user }, setSession }}
    >
      {loading ? <FullPageLoading /> : children}
    </SessionContext.Provider>
  );
}
