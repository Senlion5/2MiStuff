//* default styles for the Text Input
import { Platform } from "react-native";

import { Colors } from "./colors";

export default {
  colors: Colors,
  inputTextStyle: {
    color: Colors.strong,
    fontSize: 17,
    marginLeft: 5,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};
