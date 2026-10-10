import { supabase } from "../config/supabaseClient.js";

const MEMBER_COLUMNS = "id, name, email, phone, address";

export const MemberModel = {
  async create(payload) {
    const { data, error } = await supabase
      .from("members")
      .insert([payload])
      .select(MEMBER_COLUMNS)
      .single();
    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from("members")
      .select(MEMBER_COLUMNS)
      .order("name");
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("members")
      .select(MEMBER_COLUMNS)
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("members")
      .update(payload)
      .eq("id", id)
      .select(MEMBER_COLUMNS)
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) throw error;
    return { message: "Member deleted successfully" };
  },
};
