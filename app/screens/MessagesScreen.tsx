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
import Profile from "../components/Profile";
import useApi from "../hooks/useApi";
import messagesApi from "../api/messages";
import LoadingIndicator from '../components/LoadingIndicator';

const MessagesScreen: FC<Navigation> = ({ navigation }): JSX.Element => {
  const {data: loadedMessages, hasError, isLoading, emptyItems, request: loadMessages} = useApi(messagesApi.getMessages);
  const { request: deleteMessage } = useApi(messagesApi.deleteMessage);
  const [messages, setMessages] = useState<Array<any>>([]);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    setMessages(loadedMessages);
  }, [loadedMessages]);

  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (myMessage: any) => {
    deleteMessage(myMessage.id);
    setMessages(messages.filter((m) => m.id !== myMessage.id));
  };

  return (
    <>
      {isLoading && <LoadingIndicator visible={isLoading} />}
      {emptyItems && <AppText style={styles.text}>You have no messages.</AppText> }
      <Screen style={styles.container}>
        {hasError && (
            <>
              <AppText>Couldn't get your messages.</AppText>
              <AppButton title="Try again" onPress={loadMessages} />
            </> 
        )}

        <FlatList
          data={messages}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.fromUser ? item.fromUser.name : "DELETED ACCOUNT"}
              subTitle={item.content}
              ImageComponent={<Profile />}
              image={item.images && item.images[0].thumbnailUrl}
              onPress={item.fromUser ? () => 
                navigation.navigate(Routes.BUYER, { params: item }) 
                : 
                () => handleDelete(item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            setMessages(loadedMessages);
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
    padding: 20,
    
  }
});

export default MessagesScreen;
