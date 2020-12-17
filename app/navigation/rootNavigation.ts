import React from "react";
import { NavigationContainerRef } from "@react-navigation/native";

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

export const navigate = (name: string, params?: any) => {
    navigationRef.current?.navigate(name, params);
}
