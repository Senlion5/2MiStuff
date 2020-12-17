import React, { FC } from "react";
import { Alert, Keyboard, View, StyleSheet } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Yup from "yup";

import messagesApi from "../../api/messages";
import { CustomFormikForm, CustomFormField, SubmitButton } from "./index";
import { Colors } from "../../config/colors";

interface ContactBuyerFormProps {
    buyerId: string;
    listingId: string;
}

const ContactBuyerForm: FC<ContactBuyerFormProps> = ( { buyerId, listingId } ): JSX.Element => {
    const handleSubmit = async ( { message }: any, { resetForm }: any) => {
        Keyboard.dismiss();

        const result: any = await messagesApi.response(message, buyerId, listingId);
        
        if (!result.ok) {
            console.log("Error", result);
            return Alert.alert("Error", "Could not send the message.");
        }

        resetForm();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false,
            }),
          });
          
          Notifications.scheduleNotificationAsync({
            content: {
              title: 'Done!',
              body: "Your answer has been sent.",
            },
            trigger: null,
          });
    };

    return (
      <View style={styles.container}>
        <CustomFormikForm
          initialValues={{ message: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <CustomFormField
            maxLength={255}
            multiline
            name="message"
            numberOfLines={3}
            placeholder="Answer a potential buyer..."
          />
          <SubmitButton title="Send" color={Colors.brown} />
        </CustomFormikForm>
      </View>
    );
}

const validationSchema = Yup.object().shape({
    message: Yup.string().required().min(1).label("Message"),
});

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 8,
    backgroundColor: Colors.cherry,
    marginBottom: 30
  }
})

export default ContactBuyerForm;