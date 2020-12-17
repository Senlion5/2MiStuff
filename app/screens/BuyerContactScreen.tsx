import React from "react";
import { FC, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import BuyerItem from "../components/BuyerItem";
import Profile from "../components/Profile";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";
import UploadScreen from './UploadScreen';
import { MessagePack } from '../config/messagePack';
import ContactBuyerForm from "../components/forms/ContactBuyerForm";
import SquareItem from "../components/SquareItem";

interface BuyerContactScreenProps {
  route: {
    params: any;
  }
}

const BuyerContactScreen: FC<BuyerContactScreenProps> = ({ route }): JSX.Element => {
  const potentialBuyer: MessagePack = route.params.params;
  const [uploadScreenVisible, setUploadScreenVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const {data, request: getBuyerIcon} = useApi(usersApi.getUserProps);

  useEffect(() => {
    getBuyerIcon(potentialBuyer.fromUser.id);
  }, []);

  return (
    <Screen>
      <UploadScreen 
        onDone={() => setUploadScreenVisible(false)} 
        progress={progress} 
        visible={uploadScreenVisible} 
      />
      <View style={styles.container}>
        <BuyerItem
          title={potentialBuyer.fromUser.name}
          subTitle={data?.email}
          ImageComponent={<Profile />}   
          image={data?.itemOwnerIcon} 
        />
      </View>
      <ScrollView>
        <View style={styles.detailsContainer}>
          <View style={styles.itemContainer}>
            <SquareItem 
              image={potentialBuyer.images[0].thumbnailUrl}
              title={potentialBuyer.listing.title}
              subTitle={potentialBuyer.content}
            />
          </View>
          <View>
            <ContactBuyerForm 
              buyerId={potentialBuyer.fromUser.id} 
              listingId={potentialBuyer.listing.id} 
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    width: 160,
  },
  container: {
    marginVertical: 5
  },
  detailsContainer: {
    padding: 20,
    marginBottom: 100
  },
  image: {
    flexDirection: "row",
    marginVertical: 10,
  },
  itemContainer: {
    marginBottom: 20
  }
});

export default BuyerContactScreen;
