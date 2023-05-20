// import * as fs from "fs";
import { setExtraColors } from "../theme/colors";
import { extraColorTypes } from "../types";
import { setApiKey } from "./KeyManager";

type configProps = {
  googleMapApiKey?: string;
  colors?: extraColorTypes;
};

export function initialize(config: configProps): void {
  try {
    setApiKey({
      GOOGLE_MAP_API_KEY: config.googleMapApiKey,
    });
    if (config.colors) setExtraColors(config.colors);
  } catch (error) {
    console.error("Error reading the config file:", error);
  }
}
