import { postApiRQ } from "@/services/api/api";
import { getAuthUrl } from "@/services/api/constants";

interface ILogin {
  token: string;
}

export const login = async (email: string, password: string) => {
  const url = getAuthUrl("login");
  const response = await postApiRQ<ILogin>(url, {
    email,
    password,
  });

  console.log({ response });
  return response;
};
