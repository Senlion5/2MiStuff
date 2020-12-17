import React, { FC } from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import { TextInputProps } from "../AppTextInput";

interface CustomFormFieldProps extends TextInputProps {
  name: string;
}

const AppFormField: FC<CustomFormFieldProps> = ({
  name,
  width,
  ...otherProps
}): JSX.Element => {
  const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();
  const myErrors: any = errors;
  const myTouched: any = touched;
  const myValues: any = values;

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={text => setFieldValue(name, text)}
        value={myValues[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={myErrors[name]} visible={myTouched[name]} />
    </>
  );
};

export default AppFormField;
