import { createContext } from "react";

export interface ISessionContext {
  session: Session;
  setSession(value: Session): void;
}

export default createContext<ISessionContext>({
  session: {
    loggedIn: false,
    user: null,
  },
  setSession: () => {},
});
