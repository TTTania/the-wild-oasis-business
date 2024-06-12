import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, status, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  //FIlter
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  //Sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = PAGE_SIZE * (page - 1);
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function getBookingsByCabin(cabinId) {
  //return type [object]
  if (!cabinId) return [];

  const query = supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .gte("endDate", getToday())
    .not("status", "eq", "checked-out");

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Booked dates could not be loaded");
  }
  return data;
}

export async function checkForOverlappingBookings(
  cabinId,
  startDate,
  endDate,
  editBookingId = null
) {
  let query = supabase
    .from("bookings")
    .select("id")
    .not("status", "eq", "checked-out")
    .eq("cabinId", cabinId)
    .lte("startDate", endDate)
    .gte("endDate", startDate);

  if (editBookingId) {
    query = query.not("id", "eq", editBookingId);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Failed to check for overlapping bookings");
  }

  return data.length > 0;
}

//To create a new booking
export async function createBooking(newBooking) {
  const { cabinId, startDate, endDate } = newBooking;
  const hasOverlap = await checkForOverlappingBookings(
    cabinId,
    startDate,
    endDate
  );

  if (hasOverlap) {
    throw new Error("The cabin is already booked for the selected dates.");
  } else {
    const { data: dataBooking, error: errorBooking } = await supabase
      .from("bookings")
      .insert([{ ...newBooking }])
      .select();

    if (errorBooking) {
      console.error(errorBooking);
      throw new Error("Booking could not be created");
    }
    return dataBooking;
  }
}
