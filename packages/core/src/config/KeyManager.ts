type configTypes = {
  GOOGLE_MAP_API_KEY?: string;
  DEFAULT_FONT_FAMILY?: string;
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
