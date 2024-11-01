export const API_TIMEOUT = 50000;

export const baseUrl = "http://10.0.2.2:8080";
export const wsBaseUrl = "ws://10.0.2.2:8080";

export const apiUrls = {
  login: "/auth/login",
  register: "/auth/register",
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

export const getAuthUrl = (type: "login" | "register") => {
  return getUrl(apiUrls[type], {});
};
