import { ReactNode } from "react";
import { css, StyleSheet } from "aphrodite";

import Centered, { CENTERED } from "~/components/Centered";
import { PREVENT_TEXT_HIGHLIGHTING } from "~/constants/styles";

interface Props {
  title: string;
  children: ReactNode;
}

export default function CenteredPageTitle({ title, children }: Props) {
  return (
    <Centered centered={CENTERED.BOTH}>
      <h1 className={css(styles.title)}>{title}</h1>
      {children}
    </Centered>
  );
}

const styles = StyleSheet.create({
  title: {
    ...PREVENT_TEXT_HIGHLIGHTING,
    color: "white",
    marginBottom: "30px",
    textAlign: "center",
  },
});
