import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Card from "../components/Card";
import { Navigation } from '../navigation/navigation';
import { Routes } from "../navigation/routes";

import listingsApi from "../api/listings";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import LoadingIndicator from '../components/LoadingIndicator';
import useApi from "../hooks/useApi";

import { CategoryPicker, CustomFormikForm } from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import categories from "../config/categories";
import { Section } from "../config/section";

const validationSchema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category"),
});

const ListingsScreen: FC<Navigation> = ({ navigation }): JSX.Element => {
  const {data: listings, hasError, isLoading, request: loadListings} = useApi(listingsApi.getListings);
  const [category, setCategory] = useState<Section | undefined>(undefined);

  useEffect(() => {
    loadListings(category);
  }, [category]);

  const handleSortByCategory = (category: any) => setCategory(category);

  return (
    <>
      {isLoading && <LoadingIndicator visible={isLoading} />}
      <Screen style={styles.screen}>
        {hasError && (
          <>
            <AppText>Couldn't get the listings.</AppText>
            <AppButton title="Try again" onPress={loadListings} />
          </> 
        )}

        <View style={styles.category}>
          <CustomFormikForm 
            initialValues={{ category: null }}
            onSubmit={handleSortByCategory}
            validationSchema={validationSchema}
            >
            <CategoryPicker 
              items={categories}
              name="category"
              placeholder="Sort by category"
              PickerItemComponent={CategoryPickerItem}
              onSelectItem={handleSortByCategory}
            />
          </CustomFormikForm>
        </View>

        <FlatList
          data={listings}
          keyExtractor={(listing) => listing._id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              category={item.categoryId}
              price={"$" + item.price}
              imageUrl={item.images[0].url}
              thumbnailUrl={item.images[0].thumbnailUrl}
              onPress={() => navigation.navigate(Routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  category: {
    marginBottom: 6
  }
});

export default ListingsScreen;
