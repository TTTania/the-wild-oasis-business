import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getGuests({ page }) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  //Filter

  //Sort
  if (page) {
    const from = PAGE_SIZE * (page - 1);
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  //Error
  if (error) {
    console.log(error);
    throw new Error("Guests could not be loaded");
  }

  return { data, count };
}
/*
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }
  */
