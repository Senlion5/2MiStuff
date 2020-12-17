import React, { FC, useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import Screen from "../components/Screen";
import ListItemSeparator from "./../components/ListItemSeparator";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { Navigation } from "../navigation/navigation";
import { Routes } from "../navigation/routes";
import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import LoadingIndicator from '../components/LoadingIndicator';

const MessagesScreen: FC<Navigation> = ({ navigation }): JSX.Element => {
  const { data: myListings, hasError, isLoading, emptyItems, request: loadMyListings } = useApi(listingsApi.getMyListings);
  const { request: deleteListing } = useApi(listingsApi.deleteListing);
  const [listings, setListings] = useState<Array<any>>([]);

  useEffect(() => {
    loadMyListings();
  }, []);

  useEffect(() => {
    setListings(myListings);
  }, [myListings]);

  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (myListing: any) => {
    deleteListing(myListing._id);
    setListings(listings?.filter(m => m._id !== myListing._id));
  };

  return (
    <>
      {isLoading && <LoadingIndicator visible={isLoading} />}
      {emptyItems && <AppText style={styles.text}>You have no listings.</AppText> }
      <Screen style={styles.container}>
      {hasError && (
          <>
            <AppText>Couldn't get your listings.</AppText>
            <AppButton title="Try again" onPress={loadMyListings} />
          </> 
        )}

        <FlatList
          data={listings}
          keyExtractor={(listing) => listing._id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.description}
              image={item.images[0].thumbnailUrl}
              onPress={() => navigation.navigate(Routes.MY_LISTING, { params: item })}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            setListings(myListings);
          }}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40
  },
  text: {
    padding: 20
  }
});

export default MessagesScreen;
