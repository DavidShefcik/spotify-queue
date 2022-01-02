import { useContext } from "react";

import SessionModalContext from "./SessionModalContext";
import Modal, { BUTTON_TYPES } from "~/components/Modal";

export default function SessionModal() {
  const { visible, setVisible } = useContext(SessionModalContext);

  return (
    <Modal
      title="Sorry!"
      text="Due to limitations with Spotify's API, you need to have Spotify premium to host a queue."
      visible={visible}
      buttonTypes={BUTTON_TYPES.SUBMIT}
      submitModal={() => setVisible(false)}
      closeModal={() => setVisible(false)}
    />
  );
}
