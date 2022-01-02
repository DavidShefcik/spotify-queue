import { createContext } from "react";

import { ModalContext } from "~/context/ModalBaseContext";

export default createContext<ModalContext>({
  visible: false,
  setVisible: () => {},
});

export type { ModalContext };
