import { ReactNode, useState, useEffect } from "react";

import SessionContext from "./SessionContext";
import LogoutModalContext from "./ui/LogoutModalContext";
import FullPageLoading from "~/components/FullPageLoading";
import { api } from "~/utils/api";

interface Props {
  children: ReactNode;
}

export default function GlobalContextProvider({ children }: Props) {
  // Shared
  const [loading, setLoading] = useState(true);
  // Session
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Session["user"]>(null);
  // Logout
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

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
      <LogoutModalContext.Provider
        value={{
          visible: logoutModalVisible,
          setVisible: (val) => setLogoutModalVisible(val),
        }}
      >
        {loading ? <FullPageLoading /> : children}
      </LogoutModalContext.Provider>
    </SessionContext.Provider>
  );
}
