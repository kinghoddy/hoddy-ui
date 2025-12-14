export const errorMessage = (error: any) => {
  return error?.response?.data?.message || error?.message || error;
};
export const numberFormatter = (number: string | undefined) => {
  if (!number) return "Not provided";
  let st = number.toString().replace("+234", "");
  if (st[0] === "0") st = st.replace(st[0], "");
  const stAr = st.split("");
  stAr.splice(3, 0, " ");
  stAr.splice(7, 0, " ");

  return "+234 " + stAr.join("");
};

export const numberFormatter2 = (number: string | undefined) => {
  if (!number) return "Not provided";
  let st = number.toString().replace("+234", "");
  if (st[0] === "0") st = st.replace(st[0], "");

  return 0 + st;
};

export const currencyFormatter = (value: number | string, options?: any) => {
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    symbol: "₦",
  };
  if (typeof value !== "number") value = 0.0;
  options = { ...defaultOptions, ...options };
  value = value.toFixed(options.significantDigits);

  const [currency, decimal] = value.split(".");
  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}${options.decimalSeparator}${decimal}`;
};
export const getLocationIcon = (types: string[] = []) => {
  // Check for specific location types and return appropriate MaterialIcons name
  if (types.includes("airport")) return "flight";
  if (types.includes("hospital")) return "local-hospital";
  if (types.includes("school") || types.includes("university")) return "school";
  if (types.includes("bank") || types.includes("atm")) return "account-balance";
  if (types.includes("gas_station")) return "local-gas-station";
  if (types.includes("restaurant") || types.includes("food"))
    return "restaurant";
  if (types.includes("shopping_mall") || types.includes("store"))
    return "store";
  if (types.includes("lodging")) return "hotel";
  if (types.includes("church") || types.includes("place_of_worship"))
    return "place";
  if (types.includes("park")) return "park";
  if (types.includes("gym") || types.includes("health"))
    return "fitness-center";
  if (types.includes("pharmacy")) return "local-pharmacy";
  if (types.includes("police")) return "local-police";
  if (types.includes("fire_station")) return "fire-truck";
  if (types.includes("bus_station") || types.includes("transit_station"))
    return "directions-bus";
  if (types.includes("establishment") || types.includes("point_of_interest"))
    return "business";

  // Default location icon
  return "place";
};
