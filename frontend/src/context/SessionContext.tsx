import { createContext } from "react";

export interface ISessionContext {
  session: Session;
  setSession(value: Session): void;
}

class SessionContext {
  isLoggedIn: boolean = false;
  user: User | null = null;

  login(user: User) {
    this.isLoggedIn = true;
    this.user = user;
  }
  logout() {
    this.isLoggedIn = false;
    this.user = null;
  }
  updateUser(values: Partial<User>) {
    if (this.isLoggedIn) {
      const newUser = Object.assign(this.user, values);

      this.user = newUser;
    }
  }
}

const session = new SessionContext();

export default createContext<SessionContext>(session);

export { session };
