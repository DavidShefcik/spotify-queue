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
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<Session["user"]>(null);

  const setSession = ({ loggedIn: newLoggedIn, user: newUser }: Session) => {
    setLoggedIn(newLoggedIn);
    setUser(newUser);
  };

  useEffect(() => {
    (async () => {
      // Session check
      try {
        const { data } = await api.get<AuthCheckResponse>("/auth/check");

        setSession({
          loggedIn: true,
          user: data,
        });
      } catch (error) {
        console.error(error);

        setSession({
          loggedIn: false,
          user: null,
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
