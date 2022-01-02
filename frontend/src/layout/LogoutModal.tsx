import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LogoutModalContext from "~/context/ui/LogoutModalContext";
import Modal, { BUTTON_TYPES } from "~/components/Modal";

export default function LogoutModal() {
  const { visible, setVisible } = useContext(LogoutModalContext);

  const navigate = useNavigate();

  const submit = () => {
    setVisible(false);
    navigate("/logout");
  };

  return (
    <Modal
      title="Logout"
      text="Are you sure you want to log out?"
      visible={visible}
      closeModal={() => setVisible(false)}
      submitModal={submit}
      buttonTypes={BUTTON_TYPES.SUBMIT}
    />
  );
}
