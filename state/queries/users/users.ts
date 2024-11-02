import { getApiRQ } from "@/services/api/api";
import { getUsersUrl } from "@/services/api/constants";
import { queryParamType } from "@/types";
import { generateCacheQueryKeyForOptions } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";

export interface GetUsers {
  pagination: Pagination;
  users: User[];
}

export interface Pagination {
  currentPage: number;
  limit: number;
  offset: number;
  totalItems: number;
  totalPages: number;
}

export interface User {
  created_at: Date;
  email: string;
  id: string;
  last_login: Date;
  updated_at: Date;
  username: string;
}

export function useGetUsers({
  options,
  queryParams,
}: {
  options: any;
  queryParams?: queryParamType<GetUsers, Error>;
}) {
  const queryKey = generateCacheQueryKeyForOptions("get-users", {
    ...options,
  });

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const url = getUsersUrl(options);
      const response = await getApiRQ<GetUsers>(url);

      console.log({ response });
      return response;
    },
    ...queryParams,
  });
}
