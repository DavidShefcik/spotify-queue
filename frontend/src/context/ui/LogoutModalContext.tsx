import { createContext } from "react";

export interface ILogoutModalContext {
  visible: boolean;
  setVisible(value: boolean): void;
}

export default createContext<ILogoutModalContext>({
  visible: false,
  setVisible: () => {},
});
