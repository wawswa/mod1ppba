import { supabase } from "../config/supabaseClient.js";

const BOOK_COLUMNS =
  "id, isbn, title, author, publisher, published_year, stock";

export const BookModel = {
  async create(payload) {
    const { data, error } = await supabase
      .from("books")
      .insert([payload])
      .select(BOOK_COLUMNS)
      .single();
    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from("books")
      .select(BOOK_COLUMNS)
      .order("title");
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("books")
      .select(BOOK_COLUMNS)
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("books")
      .update(payload)
      .eq("id", id)
      .select(BOOK_COLUMNS)
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("books").delete().eq("id", id);
    if (error) throw error;
    return { message: "Book deleted successfully" };
  },
};
