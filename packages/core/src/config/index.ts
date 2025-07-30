// import * as fs from "fs";
import { setExtraColors } from "../theme/colors";
import { extraColorTypes } from "../types";
import { setConfig } from "./KeyManager";

/**
 * Configuration options for the Hoddy UI library
 *
 * @example
 * ```typescript
 * initialize({
 *   googleMapApiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxx",
 *   edgeToEdge: true,
 *   colors: {
 *     primary: "#007AFF",
 *     secondary: "#34C759"
 *   },
 *   typography: {
 *     fontFamily: "Inter",
 *     fontWeights: {
 *       400: "Inter-Regular",
 *       500: "Inter-Medium",
 *       600: "Inter-SemiBold",
 *       700: "Inter-Bold"
 *     }
 *   }
 * });
 * ```
 */
type configProps = {
  /** Google Maps API key for map components */
  googleMapApiKey?: string;
  /** Custom color palette overrides */
  colors?: extraColorTypes;
  /** Enable edge-to-edge display mode */
  edgeToEdge?: boolean;
  /** Typography settings */
  typography?: {
    /** Primary font family */
    fontFamily?: string;
    /** Font family mappings for each weight (Android support) */
    fontWeights?: {
      [K in 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900]?: string;
    };
  };
};

export function initialize(config: configProps): void {
  try {
    setConfig({
      GOOGLE_MAP_API_KEY: config.googleMapApiKey,
      TYPOGRAPHY: config.typography,
      EDGE_TO_EDGE: config.edgeToEdge ?? false,
    });
    if (config.colors) setExtraColors(config.colors);
  } catch (error) {
    console.error("Error reading the config file:", error);
  }
}
