// import * as fs from "fs";
import { setExtraColors } from "../theme/colors";
import { extraColorTypes } from "../types";
import { setConfig } from "./KeyManager";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption";

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
 *     },
 *     fontSizes: {
 *       h1: 48,
 *       h2: 40,
 *       body1: 16,
 *       caption: 12
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
    /** Custom font sizes for each typography variant (values in pixels, will be scaled with ms()) */
    fontSizes?: {
      [K in TypographyVariant]?: number;
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
