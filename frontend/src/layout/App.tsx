import Navigation from "./Navigation";
import GlobalContextProvider from "~/context/GlobalContextProvider";
import LogoutModal from "./LogoutModal";

export default function App() {
  return (
    <GlobalContextProvider>
      <Navigation />
    </GlobalContextProvider>
  );
}
