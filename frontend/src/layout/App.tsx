import Navigation from "./Navigation";
import GlobalContextProvider from "~/context/GlobalContextProvider";

export default function App() {
  return (
    <GlobalContextProvider>
      <Navigation />
    </GlobalContextProvider>
  );
}
