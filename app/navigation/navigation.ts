
import { FC } from "react";
import { Routes } from "./routes";

export interface Navigation {
        navigation: {
          navigate: (screen?: Routes, item?: {}) => FC;
        };
};