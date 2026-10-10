-- Data contoh untuk uji coba (opsional). Jalankan setelah schema.sql.
-- Cukup dijalankan sekali; menjalankan ulang akan menambah data duplikat.

insert into members (name, email, phone, address) values
  ('Budi Santoso', 'budi@example.com', '081234567890', 'Jl. Diponegoro No. 12, Semarang'),
  ('Siti Aminah', 'siti@example.com', '081298765432', 'Jl. Pandanaran No. 4, Semarang'),
  ('Rizky Pratama', 'rizky@example.com', '081377788899', 'Jl. Pemuda No. 21, Semarang');

insert into books (isbn, title, author, publisher, published_year, stock) values
  ('9789799731234', 'Laskar Pelangi', 'Andrea Hirata', 'Bentang Pustaka', 2005, 5),
  ('9786020332567', 'Bumi Manusia', 'Pramoedya Ananta Toer', 'Lentera Dipantara', 1980, 3),
  ('9786024246945', 'Filosofi Teras', 'Henry Manampiring', 'Kompas', 2018, 4),
  ('9780062316097', 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'Harper', 2011, 2);

-- Satu peminjaman terlambat (due_date sudah lewat, belum dikembalikan)
insert into loans (member_id, book_id, loan_date, due_date, status)
select m.id, b.id, current_date - 21, current_date - 7, 'Terlambat'
from members m, books b
where m.email = 'budi@example.com' and b.isbn = '9789799731234';

-- Peminjaman aktif
insert into loans (member_id, book_id, loan_date, due_date, status)
select m.id, b.id, current_date - 3, current_date + 4, 'Dipinjam'
from members m, books b
where m.email = 'siti@example.com' and b.isbn = '9786020332567';

insert into loans (member_id, book_id, loan_date, due_date, status)
select m.id, b.id, current_date - 1, current_date + 6, 'Dipinjam'
from members m, books b
where m.email = 'rizky@example.com' and b.isbn = '9786024246945';

-- Peminjaman yang sudah selesai
insert into loans (member_id, book_id, loan_date, due_date, return_date, status)
select m.id, b.id, current_date - 30, current_date - 16, current_date - 18, 'Dikembalikan'
from members m, books b
where m.email = 'budi@example.com' and b.isbn = '9780062316097';
