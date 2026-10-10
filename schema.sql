-- Skema database Library Loan API.
-- Jalankan seluruh query di bawah ini pada Supabase SQL Editor
-- (Dashboard -> SQL Editor -> New query -> Run).

create table members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  address text
);

create table books (
  id uuid primary key default gen_random_uuid(),
  isbn text unique,
  title text not null,
  author text,
  publisher text,
  published_year integer,
  stock integer not null default 1
);

create table loans (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  book_id uuid not null references books(id) on delete cascade,
  loan_date date not null default current_date,
  due_date date not null,
  return_date date,
  status text not null default 'Dipinjam'
    check (status in ('Dipinjam', 'Dikembalikan', 'Terlambat'))
);

-- Mempercepat filter ?status=, ?member_id=, dan ?book_id= pada GET /api/loans
create index loans_status_idx on loans (status);
create index loans_member_id_idx on loans (member_id);
create index loans_book_id_idx on loans (book_id);
