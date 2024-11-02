import { UseQueryOptions } from "@tanstack/react-query";

export type queryParamType = Omit<
  UseQueryOptions<any, unknown>,
  "queryKey" | "queryFn"
>;
