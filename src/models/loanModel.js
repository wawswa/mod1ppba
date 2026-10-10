import { supabase } from "../config/supabaseClient.js";

const LOAN_COLUMNS = `
  id, loan_date, due_date, return_date, status, member_id, book_id,
  members ( id, name, email ),
  books ( id, title, author )
`;

// Tanggal hari ini dalam format YYYY-MM-DD mengikuti zona waktu server.
function today() {
  return new Date().toLocaleDateString("en-CA");
}

export const LoanModel = {
  // Peminjaman yang melewati due_date dan belum dikembalikan ditandai "Terlambat",
  // sehingga data di database selalu sinkron dengan hasil filter ?status=Terlambat.
  async syncOverdue() {
    const { error } = await supabase
      .from("loans")
      .update({ status: "Terlambat" })
      .eq("status", "Dipinjam")
      .is("return_date", null)
      .lt("due_date", today());
    if (error) throw error;
  },

  async getAll({ status, member_id, book_id } = {}) {
    await LoanModel.syncOverdue();

    let query = supabase
      .from("loans")
      .select(LOAN_COLUMNS)
      .order("loan_date", { ascending: false });

    if (status) query = query.eq("status", status);
    if (member_id) query = query.eq("member_id", member_id);
    if (book_id) query = query.eq("book_id", book_id);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id) {
    await LoanModel.syncOverdue();

    const { data, error } = await supabase
      .from("loans")
      .select(LOAN_COLUMNS)
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("loans")
      .insert([{ status: "Dipinjam", ...payload }])
      .select(LOAN_COLUMNS)
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const fields = { ...payload };
    // Menandai buku sudah dikembalikan sekaligus mengisi tanggal pengembalian.
    if (fields.status === "Dikembalikan" && !fields.return_date) {
      fields.return_date = today();
    }

    const { data, error } = await supabase
      .from("loans")
      .update(fields)
      .eq("id", id)
      .select(LOAN_COLUMNS)
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("loans").delete().eq("id", id);
    if (error) throw error;
    return { message: "Loan deleted successfully" };
  },
};
