import { DefaultTheme } from "@react-navigation/native";

import { Colors } from "../config/colors";

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.primary,
        background: Colors.wall,
    }
};

export default myTheme;