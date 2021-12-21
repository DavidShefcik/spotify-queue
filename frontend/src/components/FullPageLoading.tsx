import { PulseLoader } from "react-spinners";

import Centered, { CENTERED } from "./Centered";

export default function FullPageLoading() {
  return (
    <Centered centered={CENTERED.BOTH}>
      <PulseLoader color="white" size={16} />
    </Centered>
  );
}
