// import * as fs from "fs";
import { setExtraColors } from "../theme/colors";
import { extraColorTypes } from "../types";
import { setConfig } from "./KeyManager";

type configProps = {
  googleMapApiKey?: string;
  colors?: extraColorTypes;
  fontFamily?: string;
  edgeToEdge?: boolean;
};

export function initialize(config: configProps): void {
  try {
    setConfig({
      GOOGLE_MAP_API_KEY: config.googleMapApiKey,
      DEFAULT_FONT_FAMILY: config.fontFamily,
      EDGE_TO_EDGE: config.edgeToEdge ?? false,
    });
    if (config.colors) setExtraColors(config.colors);
  } catch (error) {
    console.error("Error reading the config file:", error);
  }
}
