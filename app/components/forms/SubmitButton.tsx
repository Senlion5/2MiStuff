import React, { FC } from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";
import { Colors } from "../../config/colors";

interface AppButtonProps {
  title: string;
  color?: Colors;
}

const SubmitButton: FC<AppButtonProps> = ({ title, color }): JSX.Element => {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} color={color} />;
};

export default SubmitButton;
