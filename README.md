Shoe Laundry API

Aplikasi ini merupakan layanan backend berbasis REST API yang berfungsi untuk mengelola data layanan cuci sepatu. Sistem ini dibangun menggunakan Node.js, Express.js, dan Supabase sebagai basis data.

Fungsi utama aplikasi ini adalah untuk mencatat, memperbarui, dan memantau pesanan layanan cuci sepatu mulai dari saat diterima hingga selesai. API ini menyediakan endpoint untuk menambah, melihat, memperbarui, dan menghapus data pesanan.

Fitur utama:

Operasi CRUD (Create, Read, Update, Delete) untuk data pesanan.

Pemantauan status pesanan (Pending, In Progress, Finished).

Otomatisasi tanggal penerimaan dan penyelesaian.

Validasi data dan penanganan kesalahan.

Desain RESTful dengan struktur endpoint yang konsisten.

Struktur data setiap pesanan mencakup:

id: UUID (otomatis dibuat oleh sistem)

customer_name: nama pelanggan

shoe_type: jenis atau merek sepatu

status: status pesanan (default: Pending)

received_date: tanggal sepatu diterima

completed_date: tanggal pesanan selesai

Langkah menjalankan aplikasi:

Pastikan Node.js sudah terpasang (versi 18 atau lebih baru).

Siapkan akun dan proyek Supabase.

Kloning repositori:
git clone https://github.com/your-username/shoe-laundry-api.git

cd shoe-laundry-api

Instal dependensi:
npm install

Salin file konfigurasi lingkungan dan isi dengan kredensial Supabase:
cp env.example .env
Lalu isi:
SUPABASE_URL=alamat_proyek_supabase
SUPABASE_ANON_KEY=kunci_anon_supabase
PORT=3000
NODE_ENV=development

Buat tabel di Supabase menggunakan perintah SQL berikut:
CREATE TABLE shoe_items (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
customer_name TEXT NOT NULL,
shoe_type TEXT NOT NULL,
status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Finished')),
received_date DATE DEFAULT CURRENT_DATE,
completed_date DATE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

Jalankan aplikasi:

Mode pengembangan: npm run dev

Mode produksi: npm start

Setelah berhasil dijalankan, API dapat diakses melalui alamat:
http://localhost:3000

Contoh penggunaan API:

Mengecek status server: GET /health

Melihat semua pesanan: GET /api/items

Menambahkan pesanan baru: POST /api/items

Memperbarui data pesanan: PUT /api/items/:id

Menghapus pesanan: DELETE /api/items/:id

Untuk pengujian, dapat menggunakan curl atau aplikasi Postman.

