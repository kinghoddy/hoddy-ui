export const errorMessage = (error: any) => {
  return error?.response?.data?.message || error?.message || error;
};
