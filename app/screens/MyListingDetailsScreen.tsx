import React, { FC } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import AppText from "../components/AppText";
import { SliderBox } from "react-native-image-slider-box";

import Screen from "../components/Screen";
import Icon from "../components/Icon";
import { Colors } from "../config/colors";
import categories from "../config/categories";
import sections from "../config/sections";
import { Listing } from "../config/listing";

interface MyListingDetailsScreenProps {
  route: {
    params: {
        params: Listing;
    };
  }
};

const MyListingDetailsScreen: FC<MyListingDetailsScreenProps> = ({ route }): JSX.Element => {
  const listing: Listing = route.params.params;

  const myCategory = categories.find(value => value.id === listing.categoryId);
  const mySection = sections.find(value => value.id === listing.sectionId);
  const myListingIcon = mySection?.icon as string; 

  const showImages: string[] = [];
  for (let i = 0; i < listing.images.length; i++ ) {
    showImages.push(listing.images[i].url);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "position"} >
      <ScrollView>
        <Screen>
            <SliderBox 
              images={showImages}
              sliderBoxHeight={300}
              dotColor={Colors.purple}
              dotStyle={{ width: 16, height: 16, borderRadius: 8 }}
              inactiveDotColor={Colors.wall}
              ImageComponentStyle={{ width: '100%' }}
              imageLoadingColor={Colors.white}
              />
            <View style={styles.details}>
                <View style={styles.iconContainer}>
                    <Icon name={myListingIcon} size={90} backgroundColor={mySection?.backgroundColor}/>
                </View>
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>{listing.title}</AppText>
                    <AppText style={styles.category}>{myCategory?.label}</AppText>
                    <AppText style={styles.price}>${listing.price}</AppText>
                </View>
            </View>
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  category: {
    fontWeight: "bold",
    marginBottom: 3,
    fontSize: 19,
  },
  detailsContainer: {
    paddingTop: 20,
    paddingBottom: 20
  },
  iconContainer: {
    padding: 22
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: Colors.price,
    fontSize: 21,
    fontWeight: "400",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 5,
  },
  details: {
    flexDirection: "row",
    marginBottom: 100
  }
});

export default MyListingDetailsScreen;
