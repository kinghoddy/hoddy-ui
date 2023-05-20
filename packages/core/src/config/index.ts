// import * as fs from "fs";
import { setApiKey } from "./KeyManager";

type configProps = {
  googleMapApiKey?: string;
  colors?: {
    primary?: {
      mains: string;
      light: string;
      dark: string;
      text: string;
    };
  };
};

export function initialize(config: configProps): void {
  try {
    setApiKey({
      GOOGLE_MAP_API_KEY: config.googleMapApiKey,
    });
  } catch (error) {
    console.error("Error reading the config file:", error);
  }
}
// export function loadConfig(): void {
//   try {
//     const configData = fs.readFileSync("./hui-config.json", "utf-8");
//     const config: configProps = JSON.parse(configData);
//     setApiKey({
//       GOOGLE_MAP_API_KEY: config.googleMapApiKey,
//     });

//     console.log("Got key from frontend", config.googleMapApiKey);
//   } catch (error) {
//     console.error("Error reading the config file:", error);
//   }
// }
