import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  //default value 7 days, otherwise convert to number
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  //calculate exactly when is 7 or 30 or 90 days, and convert to ISOstring for getBookingsAfterDate
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  //already have a bookings key, add dependency value numDays

  return { isLoading, bookings };
}
