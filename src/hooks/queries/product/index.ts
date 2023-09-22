import { useQuery } from "@tanstack/react-query";
import { api, queryClient } from "@/services";

// import type { ProductType } from "~/types";

interface GetProductsPayload {}

interface GetProductsResponse {}

const PRODUCT_LIST_QUERY = "PRODUCT_LIST_QUERY";

export const getProducts = async (
  payload?: GetProductsPayload
) => {
  const params = new URLSearchParams(
    payload as Record<string, any>
  ).toString();

  const { data } =
    await api.get<GetProductsResponse>(
      `/products?${params}`
    );

  return data;
};

export const useProducts = (
  payload?: GetProductsPayload
) => {
  return useQuery(
    [PRODUCT_LIST_QUERY, JSON.stringify(payload)],
    () => getProducts(payload)
  );
};

export const prefetchProducts = async (
  payload?: GetProductsPayload
) => {
  return await queryClient.prefetchQuery(
    [PRODUCT_LIST_QUERY, JSON.stringify(payload)],
    () => getProducts(payload)
  );
};
