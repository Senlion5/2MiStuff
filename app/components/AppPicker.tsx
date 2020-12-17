import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../config/colors";
import { Section } from "../config/section";
import AppText from "./AppText";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import { PickerItemProps } from "./PickerItem";

export interface AppPickerProps {
  icon?: string;
  items: Array<Section>;
  numberOfColumns?: number;
  placeholder?: string;
  PickerItemComponent?: FC<PickerItemProps>;
  selectedItem?: Section;
  onSelectItem?: (item: Section) => void;
  width?: number;
}

const AppPicker: FC<AppPickerProps> = ({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={26}
              color={Colors.light}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={26}
            color={Colors.light}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  if (onSelectItem) onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purple,
    borderRadius: 25,
    flexDirection: "row",
    padding: 12,
    paddingRight: 20,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    color: Colors.light,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
