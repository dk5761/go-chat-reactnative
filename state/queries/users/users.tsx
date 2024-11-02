import { getApiRQ } from "@/services/api/api";
import { getUsersUrl } from "@/services/api/constants";
import { queryParamType } from "@/types";
import { generateCacheQueryKeyForOptions } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers({
  options,
  queryParams,
}: {
  options: any;

  queryParams?: queryParamType;
}) {
  const queryKey = generateCacheQueryKeyForOptions("caselist", {
    ...options,
  });

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const url = getUsersUrl(options);
      const response = await getApiRQ(url);

      console.log({ response });
      return response;
    },
    ...queryParams,
  });
}
