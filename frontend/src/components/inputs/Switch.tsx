import ReactSwitch from "react-switch";

import { COLORS } from "~/constants/colors";
import BaseInput, { InputProps } from "./BaseInput";

export default function Switch(props: InputProps<boolean>) {
  const { value, onChange, disabled } = props;

  return (
    <BaseInput {...props}>
      <ReactSwitch
        checked={value}
        onChange={onChange}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor={COLORS.SPOTIFY_GREEN}
        offColor={COLORS.DARK_GRAY}
        activeBoxShadow="0"
        disabled={disabled}
      />
    </BaseInput>
  );
}
