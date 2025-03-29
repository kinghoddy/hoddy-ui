type configTypes = {
  GOOGLE_MAP_API_KEY?: string;
  DEFAULT_FONT_FAMILY?: string;
};

let config: configTypes = {
  GOOGLE_MAP_API_KEY: "",
};

export function setConfig(key: configTypes): void {
  config = key;
}

export function getConfig(): configTypes {
  return config;
}
