import { createContext } from "react";

// TODO: Replace context functions with a class that contains
// the values (loggedIn status and user) along with
// methods to easily log in and out, update user details, etc.
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
