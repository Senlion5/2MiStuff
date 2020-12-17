import React, { FC, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import useLocation from "../hooks/useLocation";

import {
  CustomFormField,
  CustomFormikForm,
  CustomFormPicker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import SectionPicker from "../components/SectionPicker";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import UploadScreen from "./UploadScreen";
import categories from "../config/categories";
import sections from "../config/sections";
import { Colors } from "../config/colors";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).max(64).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().max(255).label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  section: Yup.object().required().nullable().label("Section"),
  images: Yup.array().min(1, "At least, one image is required.")
});

const ListingsEditScreen: FC = (): JSX.Element => {
  const location = useLocation();
  const [uploadScreenVisible, setUploadScreenVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleSubmit = async (listing: any, FormikBag: any ) => {
    setProgress(0);
    setUploadScreenVisible(true);

    const result = await listingsApi.addListing(
      {...listing, location},
      (progress: any) => setProgress(progress)
      );

    if (!result.ok) {
      setUploadScreenVisible(false);
      return alert("Could not save the listings.");
    }

    FormikBag.resetForm();
  };

  return (
    <ScrollView>
      <Screen style={styles.container}>
      <UploadScreen 
      onDone={() => setUploadScreenVisible(false)} 
      progress={progress} 
      visible={uploadScreenVisible} />
      <CustomFormikForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          section: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <CustomFormField name="title" placeholder="Title" />
        <CustomFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={150}
        />
        <CustomFormPicker
          items={categories}
          name="category"
          placeholder="Category"
          width={220}
        />
        <CustomFormPicker
          items={sections}
          name="section"
          numberOfColumns={3}
          PickerItemComponent={SectionPicker}
          placeholder="Section"
          width={220}
        />
        <CustomFormField
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" color={Colors.brown}/>
      </CustomFormikForm>
      </Screen>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default ListingsEditScreen;
