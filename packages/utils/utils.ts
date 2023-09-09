export const errorMessage = (error: any) => {
  return error?.response?.data?.message || error?.message || error;
};
export const numberFormatter = (number: number | undefined) => {
  if (!number) return "Not provided";
  let st = number.toString().replace("+234", "");
  if (st[0] === "0") st = st.replace(st[0], "");
  const stAr = st.split("");
  stAr.splice(3, 0, "-");
  stAr.splice(7, 0, "-");

  return "+234 " + stAr.join("");
};
