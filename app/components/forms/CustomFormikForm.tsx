import React, { FC } from "react";
import { Formik } from "formik";

export interface CustomFormikFormProps {
  initialValues: {
    name?: string;
    email?: string;
    password?: string;
    title?: string;
    price?: string;
    description?: string;
    message?: string;
    category?: {} | null;
    section?: {} | null;
    images?: [];
  };
  onSubmit: (values: any, FormikBag?: any) => void;
  validationSchema: {};
}

const CustomFormikForm: FC<CustomFormikFormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}): JSX.Element => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(): JSX.Element => <>{children}</>}
    </Formik>
  );
};

export default CustomFormikForm;
