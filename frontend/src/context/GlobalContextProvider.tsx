import { ReactChild, useState, useEffect } from "react";

import SessionContext from "./SessionContext";
import FullPageLoading from "~/components/FullPageLoading";
import { api } from "~/utils/api";
import { AuthCheckResponse } from "~/utils/api/types";

interface Props {
  children: ReactChild;
}

export default function GlobalContextProvider({ children }: Props) {
  // Shared
  const [loading, setLoading] = useState(true);
  // Session
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Session["user"]>(null);

  const setSession = ({ isLoggedIn: newLoggedIn, user: newUser }: Session) => {
    setIsLoggedIn(newLoggedIn);
    setUser(newUser);
  };

  useEffect(() => {
    (async () => {
      // Session check
      const { error, response } = await api.authCheck();

      if (error) {
        setSession({
          isLoggedIn: false,
          user: null,
        });
      } else if (response) {
        setSession({
          isLoggedIn: true,
          user: response,
        });
      }

      setLoading(false);
    })();
  }, []);

  return (
    <SessionContext.Provider
      value={{ session: { isLoggedIn, user }, setSession }}
    >
      {loading ? <FullPageLoading /> : children}
    </SessionContext.Provider>
  );
}
