export const API_TIMEOUT = 50000;

export const apiUrls = {
  auth: "",
};

export const checkOptionalParams = (options: any) => {
  return Object.entries(options)
    .filter(
      ([_, value]) =>
        value !== undefined &&
        value !== "" &&
        value !== null &&
        (!Array.isArray(value) || value.length > 0) // Check for non-empty arrays
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

const getUrl = (url: string, options: any) => {
  if (options && Object.keys(options).length > 0) {
    const filteredOptions = Object.entries(options)
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);
    const optionalParams = checkOptionalParams(filteredOptions);

    return url.includes("?")
      ? `${url}&${optionalParams}`
      : `${url}?${optionalParams}`;
  }
  return url;
};
