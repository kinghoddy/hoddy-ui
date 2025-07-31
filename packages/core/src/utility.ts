import { getConfig } from "./config/KeyManager";

export const getFontFamily = (
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
) => {
  return (
    getConfig().TYPOGRAPHY?.fontWeights?.[fontWeight] ||
    getConfig().TYPOGRAPHY?.fontFamily ||
    undefined
  );
};
