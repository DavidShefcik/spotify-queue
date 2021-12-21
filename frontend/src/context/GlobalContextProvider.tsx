import { ReactChild } from "react";

interface Props {
  children: ReactChild;
}

export default function GlobalContextProvider({ children }: Props) {
  return <>{children}</>;
}
