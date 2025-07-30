type configTypes = {
  GOOGLE_MAP_API_KEY?: string;
  TYPOGRAPHY?: {
    fontFamily?: string;
    fontWeights?: {
      [K in 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900]?: string;
    };
  };
  EDGE_TO_EDGE?: boolean;
};

let config: configTypes = {
  GOOGLE_MAP_API_KEY: "",
  EDGE_TO_EDGE: false,
};

export function setConfig(key: configTypes): void {
  config = key;
}

export function getConfig(): configTypes {
  return config;
}
