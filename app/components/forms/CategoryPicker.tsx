import React, { FC, useState } from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import { AppPickerProps } from "../AppPicker";
import { Section } from "../../config/section";

interface CategoryPickerProps extends AppPickerProps {
  name: string;
}

const CategoryPicker: FC<CategoryPickerProps> = ({
    items,
    name,
    numberOfColumns,
    onSelectItem,
    PickerItemComponent,
    placeholder,
    width,
  }): JSX.Element => {
    const [category, setCategory] = useState<Section | undefined>(undefined);
    const { setFieldValue } = useFormikContext();
  
    return (
        <AppPicker
            items={items}
            numberOfColumns={numberOfColumns}
            onSelectItem={(item) => {
              setCategory(item);
              setFieldValue(name, item);
              if (onSelectItem) onSelectItem(item);
            }}
            PickerItemComponent={PickerItemComponent}
            placeholder={placeholder}
            selectedItem={category}
            width={width}
        />
    );
  };
  
  export default CategoryPicker;