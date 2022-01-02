import { ReactNode, useEffect, createRef } from "react";
import { css, StyleSheet } from "aphrodite";

import useAnimateMount from "~/hooks/useAnimateMount";
import useOnOutsideClick from "~/hooks/useOnOutsideClick";
import Centered, { CENTERED } from "./Centered";
import SpotifyButton from "./SpotifyButton";
import { PREVENT_TEXT_HIGHLIGHTING } from "~/constants/styles";

const ANIMATION_DURATION_MS = 150;

export enum BUTTON_TYPES {
  OK = "ok",
  SUBMIT = "submit",
}

interface Props {
  title: string;
  visible: boolean;
  submitModal(): void;
  closeModal(): void;
  text?: string;
  children?: ReactNode;
  buttonTypes?: BUTTON_TYPES;
  width?: string;
}

export default function Modal({
  title,
  visible,
  submitModal,
  text,
  children,
  closeModal,
  buttonTypes = BUTTON_TYPES.OK,
  width = "250px",
}: Props) {
  const { componentMounted, currentCSSClass, setVisibility } = useAnimateMount({
    visible,
    unmountDuration: ANIMATION_DURATION_MS,
    hiddenClass: styles.hiddenModal,
    visibleClass: styles.visibleModal,
  });

  const modal = createRef<HTMLDivElement>();

  useOnOutsideClick({
    ref: modal,
    onOutsideClick: () => closeModal(),
  });

  useEffect(() => {
    const onEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onEscapePress);

    return () => {
      window.removeEventListener("keydown", onEscapePress);
    };
  }, []);

  useEffect(() => {
    setVisibility(visible);
  }, [visible]);

  useEffect(() => {
    // Prevent body from being scrollable when modal is open
    if (componentMounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [componentMounted]);

  if (!componentMounted) {
    return null;
  }

  const submitButton = (
    <SpotifyButton text="Ok" onClick={submitModal} width="125px" />
  );
  const cancelButton = (
    <SpotifyButton
      text="Cancel"
      onClick={() => closeModal && closeModal()}
      backgroundColor="transparent"
      hoverBackgroundColor="transparent"
      textColor="rgba(0, 0, 0, 0.5)"
      width="125px"
    />
  );
  let buttonContainer = null;

  switch (buttonTypes) {
    case BUTTON_TYPES.OK:
      buttonContainer = submitButton;
      break;
    case BUTTON_TYPES.SUBMIT:
      buttonContainer = (
        <>
          {cancelButton}
          {submitButton}
        </>
      );
      break;
    default:
      buttonContainer = null;
  }

  return (
    <div className={css([styles.overlay, currentCSSClass])}>
      <Centered centered={CENTERED.BOTH}>
        <div ref={modal} style={{ width }} className={css(styles.modal)}>
          <h2 className={css(styles.title)}>{title}</h2>
          <div className={css(styles.modalContent)}>
            {text && <p className={css(styles.text)}>{text}</p>}
            {children && children}
          </div>
          <div className={css(styles.buttonContainer)}>{buttonContainer}</div>
        </div>
      </Centered>
    </div>
  );
}

const hideModalAnimation = {
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
};
const showModalAnimation = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

const styles = StyleSheet.create({
  overlay: {
    ...PREVENT_TEXT_HIGHLIGHTING,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "absolute",
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    animationDuration: `${ANIMATION_DURATION_MS}ms`,
    animationIterationCount: 1,
  },
  modal: {
    backgroundColor: "#ffffff",
    color: "#121212",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    textAlign: "start",
    fontFamily: "spotify-regular, Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  hiddenModal: {
    animationName: [hideModalAnimation],
  },
  visibleModal: {
    animationName: [showModalAnimation],
  },
  title: {
    fontSize: "18px",
    fontWeight: 700,
    letterSpacing: "normal",
    lineHeight: "24px",
    marginBottom: "8px",
  },
  modalContent: {
    marginBottom: "24px",
    maxHeight: "130px",
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: "normal",
    lineHeight: "16px",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
