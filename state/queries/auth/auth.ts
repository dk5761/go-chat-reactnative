import { api, postApi, postApiRQ } from "@/services/api/api";
import { getAuthUrl } from "@/services/api/constants";

interface AuthLogin {}

export const login = async (email: string, password: string) => {
  const url = getAuthUrl("login");
  const response = await postApiRQ(url, {
    email,
    password,
  });

  console.log({ response });
  return response;
};
