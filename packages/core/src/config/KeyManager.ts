type apikeys = {
  GOOGLE_MAP_API_KEY?: string;
};

let apiKey: apikeys = {
  GOOGLE_MAP_API_KEY: "",
};

export function setApiKey(key: apikeys): void {
  apiKey = key;
}

export function getApiKey(): apikeys {
  return apiKey;
}
