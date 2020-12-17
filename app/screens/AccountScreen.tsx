import React from "react";
import { FC, useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import Profile from "../components/Profile";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";

import { Colors } from "../config/colors";
import { Navigation } from "../navigation/navigation";
import { Routes } from "../navigation/routes";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import useAuth from "../auth/useAuth";
import UploadScreen from './UploadScreen';
import UserImagePicker from "../components/forms/UserImagePicker";
import { CustomFormikForm, SubmitButton } from "../components/forms";

interface MenuItem {
  title: string;
  icon: {
    name: string;
    backgroundColor: Colors;
  };
  targetScreen?: Routes;
}

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "Image is not set.")
});

const menuItems: Array<MenuItem> = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: Colors.dark_purple,
    },
    targetScreen: Routes.MY_LISTINGS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: Colors.brown,
    },
    targetScreen: Routes.MY_MESSAGES,
  },
];

const AccountScreen: FC<Navigation> = ({ navigation }): JSX.Element => {
  const [uploadScreenVisible, setUploadScreenVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [userPropsTriggerValue, setUserPropsTriggerValue] = useState(0);
  
  const { user, logOut }: any = useAuth(); 
  const {data: icon, request: getUserIcon} = useApi(usersApi.getUserIcon);
  const {request: deleteUser} = useApi(usersApi.deleteUser);

  useEffect(() => {
    getUserIcon();
  }, [userPropsTriggerValue]);
  
  const handleSubmit = async (userImage: any, FormikBag: any ) => {
    setProgress(0);
    setUploadScreenVisible(true);

    const result = await usersApi.addUserIcon(
      userImage,
      (progress: any) => setProgress(progress)
      );
      
      if (!result.ok) {
        setUploadScreenVisible(false);
        return alert("Could not save your account image.");
      }

      FormikBag.resetForm();
    };
    
  const alertDelete = () => {
    Alert.alert(
      "DELETE YOUR ACCOUNT", 
      "Are you sure you want to delete your account?", 
      [
        { text: "YES", onPress: () => deleteAccount() },
        { text: "CANCEL" }
      ] 
    );
  };

  const deleteAccount = async () => {
    await deleteUser();
    logOut();
  };

  return (
    <Screen>
      <UploadScreen onDone={() => {
        setUploadScreenVisible(false);
        setUserPropsTriggerValue(userPropsTriggerValue + 1);
        }} progress={progress} visible={uploadScreenVisible} />
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          ImageComponent={<Profile />}   
          image={icon?.activeIcon} 
          renderRightActions={() => (
            <ListItemDeleteAction onPress={
              () => alertDelete()
            } />
          )}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              ImageComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <View style={styles.image}>
        <CustomFormikForm 
          initialValues={{ images: [] }}         
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          >
          <UserImagePicker name="images" />
          <View style={styles.buttonContainer}>
            <AppText>your account image</AppText>
            <SubmitButton title="Upload" color={Colors.brown} />
          </View>
        </CustomFormikForm>
      </View>
      <View style={styles.logout}>
        <ListItem
          title="Log Out"
          ImageComponent={
            <Icon name="logout" backgroundColor={Colors.danger} />
          }
          onPress={() => logOut()}
        />
      </View>
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
    marginVertical: 15
  },
  image: {
    flexDirection: "row",
    marginVertical: 10,
  },
  logout: {
    marginTop: 10
  }
});

export default AccountScreen;
