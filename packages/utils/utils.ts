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
