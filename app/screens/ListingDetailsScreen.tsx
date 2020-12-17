import React, { FC, useEffect, useRef } from "react";
import { Dimensions, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import { SliderBox } from "react-native-image-slider-box";
import { Root, Popup } from 'popup-ui';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';

import Screen from "../components/Screen";
import { Colors } from "../config/colors";
import Icon from "../components/Icon";
import categories from "../config/categories";
import ContactSellerForm from "../components/forms/ContactSellerForm";
import { Listing } from "../config/listing";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";
import LocationPopupAction from "../components/LocationPopupAction";
import Profile from "../components/Profile";
import sections from "../config/sections";

interface ListingDetailsScreenProps {
  route: {
    params: Listing;
  }
}

const snapPoint: number = 70;
const headerHeight: number = 38; // paddingTop: 20 + height: 8 + marginBottom: 10
const safetyMargin: number = 20;
const mapHeight: number = Dimensions.get('screen').height * snapPoint/100 - headerHeight + safetyMargin;

const ListingDetailsScreen: FC<ListingDetailsScreenProps> = ({ route }): JSX.Element => {
  const listing = route.params;

  const mySection = sections.find(value => value.id === listing.sectionId);
  const myListingIcon = mySection?.icon as string; 

  const {data, request: getUserProps} = useApi(usersApi.getUserProps);

  useEffect(() => {
    getUserProps(listing.userId);
  }, []);

  const plural = (data?.listingsNum > 1) ? "s" : "";

  const myCategory = categories.find(value => value.id === listing.categoryId);

  const showImages: string[] = [];
  for (let i = 0; i < listing.images.length; i++ ) {
    showImages.push(listing.images[i].url);
  }

  const sheetRef = useRef<BottomSheet>(null);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}/>
      </View>
    </View>
  );

  const renderContent = () => (
    listing.location &&  
    <View style={styles.panel}>
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          initialRegion={{
            latitude: listing.location.latitude,
            longitude: listing.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0921,
          }}
        >
          <Marker
            title={listing.title}
            coordinate={{ 
              latitude: listing.location.latitude,
              longitude: listing.location.longitude
            }}
            icon={{ uri: listing.images[0].thumbnailUrl }}
            opacity={0.9}
          />
        </MapView>
      </View>
    </View>
  );

  return (
    <>
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
            <Root>
              <View style={styles.generalContainer}>
              
                <View style={styles.details}>
                  <View>
                    <Icon name={myListingIcon} size={90} backgroundColor={mySection?.backgroundColor}/>
                  </View>
              
                    <View style={styles.detailsContainer}>
                      <AppText style={styles.title}>{listing.title}</AppText>
                      <AppText style={styles.category}>{myCategory?.label}</AppText>
                      <AppText style={styles.price}>${listing.price}</AppText>
                    </View>
                </View>

                <AppText 
                style={listing.description ? styles.description : {}}
                numberOfLines={1}
                >
                  {listing.description}
                </AppText>
                <View style={styles.userContainer}>
                  <ListItem
                    ImageComponent={<Profile />}
                    image={data?.itemOwnerIcon}
                    title={data?.name}
                    subTitle={`${data?.listingsNum} listing${plural}`}
                    renderRightActions={() => (
                      <LocationPopupAction onPress={() => 
                        { if (listing.location) { 
                          if (sheetRef.current !== null) sheetRef.current.snapTo(0);
                        } else {  
                          Popup.show({
                            type: 'Danger',
                            color: Colors.danger,                       
                            title: 'No Location',
                            textBody:
                            'Location of the Item was not marked by the seller.',
                            callback: () => Popup.hide(),
                          });
                        }
                      }
                    } /> 
                    )}
                  ></ListItem>
                </View>
              <ContactSellerForm listing={listing} />
            </View>
          </Root>
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[`${snapPoint}%`, 0, 0]}
        renderHeader={renderHeader}
        renderContent={renderContent}
        initialSnap={1}
      />
    </>
  );
};

const styles = StyleSheet.create({
  category: {
    fontWeight: "bold",
    marginBottom: 3,
    fontSize: 19,
  },
  detailsContainer: {
    marginLeft: 15
  },
  description: {
    color: Colors.purple,
    fontSize: 18,
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 4
  },
  generalContainer: {
    padding: 20,
    marginBottom: 70
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
  userContainer: {
    marginVertical: 25,
  },
  location: {
    margin: 15
  },
  iconTitle: {
    fontWeight: "bold"
  },
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.wall,
    padding: 20
  },
  header: {
    backgroundColor: Colors.purple,
    shadowColor: Colors.cherry,
    paddingTop: 20, //*
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8, //*
    borderRadius: 4,
    backgroundColor: Colors.wall,
    marginBottom: 10, //*
  },
  panel: {
    height: mapHeight,
    backgroundColor: Colors.wall,
  },
  details: {
    flexDirection: "row",
    marginBottom: 4
  }
});

export default ListingDetailsScreen;
