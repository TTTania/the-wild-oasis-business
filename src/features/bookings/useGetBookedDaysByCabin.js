import { useQuery } from "@tanstack/react-query";
import { getBookingsByCabin } from "../../services/apiBookings";
import {
  isBefore,
  parseISO,
  eachDayOfInterval,
  startOfToday,
  endOfDay,
  subDays,
} from "date-fns";

export function useGetBookedDaysByCabin(cabinId) {
  const {
    isLoading: isLoadingBookedDates,
    data: bookedDates,
    error: errorBookedDates,
  } = useQuery({
    queryKey: ["booked-dates", cabinId],
    queryFn: () => getBookingsByCabin(cabinId),
  });

  const bookedDatesForCabin = bookedDates?.flatMap(({ startDate, endDate }) => {
    const start = parseISO(startDate);
    const end = endOfDay(parseISO(endDate));
    const newEnd = subDays(end, 1);

    const startToday = isBefore(start, startOfToday()) ? startOfToday() : start;

    const bookedDatesRange = eachDayOfInterval({
      start: startToday,
      end: newEnd,
    });

    return bookedDatesRange;
  });

  return { isLoadingBookedDates, bookedDatesForCabin, errorBookedDates };
}
