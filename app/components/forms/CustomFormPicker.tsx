import React, { FC } from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";
import { AppPickerProps } from "../AppPicker";

interface CustomFormPickerProps extends AppPickerProps {
  name: string;
}

const CustomFormPicker: FC<CustomFormPickerProps> = ({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}): JSX.Element => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const myValues: any = values;
  const myErrors: any = errors;
  const myTouched: any = touched;

  return (
    <>
      <AppPicker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={myValues[name]}
        width={width}
      />
      <ErrorMessage error={myErrors[name]} visible={myTouched[name]} />
    </>
  );
};

export default CustomFormPicker;
