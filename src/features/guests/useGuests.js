import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getGuests } from "../../services/apiGuests";
import { PAGE_SIZE } from "../../utils/constants";

export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //   Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //Query
  const {
    isLoading,
    data: { data: guests, count } = {},
    error,
  } = useQuery({
    queryKey: ["guests", page],
    queryFn: () => getGuests({ page }),
  });
  console.log(count);
  return { isLoading, error, guests, count };
}
