📸 Absensi Laravel React

Sistem absensi modern berbasis web menggunakan Laravel (Backend API) dan React (Frontend) 
dengan dukungan realtime update (WebSocket) serta pengembangan Face Recognition dan rencana implementasi 
RFID-based attendance system.
Project ini dirancang sebagai sistem absensi realtime, media pembelajaran fullstack, serta portofolio 
pengembangan web modern.

---

## 🚀 Fitur Utama

-  🔐 Autentikasi multi-role (Admin, User)
-  👥 Manajemen data pengguna
-  📷 Absensi menggunakan Face Recognition
-  🕒 Absensi realtime berbasis web
-  ⚡ Realtime update menggunakan WebSocket (Laravel Reverb)
-  📊 Dashboard absensi interaktif
-  🔌 REST API backend
-  🔗 Integrasi frontend React + Inertia
-  🪪 (Planned) Absensi menggunakan RFID

---

## 🚧 Development Status

### RFID Feature --- PENDING

Pengembangan fitur absensi berbasis RFID saat ini **dipending
sementara** karena perubahan prioritas.

Progress yang sudah selesai: - Setup Laravel Reverb & WebSocket - RFID
event listener - API endpoint RFID - Integrasi frontend realtime

Semua progress telah di-commit ke branch:

feature/rfid-absensi

Pengembangan akan dilanjutkan pada iterasi berikutnya.

---

## 🛠️ Tech Stack

### Backend

-   Laravel 12
-   PHP 8+
-   MySQL 
-   Laravel Reverb (WebSocket)
-   REST API
-   Python (Face Recognition Engine)

### Frontend

-   React JS
-   Inertia JS
-   Tailwind CSS
-   Vite

### Tools

-   Git & GitHub
-   Postman (API testing)
-   TablePlus / PhpMyAdmin
-   Laragon / XAMPP

---

🏗️ Arsitektur Sistem

Frontend (React + Inertia)  
↓  
Backend API (Laravel)  
↓  
Database (MySQL)  

Face Recognition Engine (Python + OpenCV)  
↑  
Webcam Capture 

---

## ⚙️ Instalasi

### 1. Clone Repository

git clone https://github.com/daffarahmatul24/absensi-laravel-react.git\
cd absensi-laravel-react

### 2. Install Dependency

composer install\
npm install

### 3. Setup Environment

cp .env.example .env\
php artisan key:generate

Atur database di file .env:

DB_DATABASE=absensi\
DB_USERNAME=root\
DB_PASSWORD=

### 4. Migrasi Database

php artisan migrate

### 5. Jalankan Server

php artisan serve\
npm run dev

Akses di browser: http://localhost:8000

---

## 🔁 Realtime System (WebSocket)

Project ini menggunakan **Laravel Reverb** untuk komunikasi realtime.

php artisan reverb:start

---

## 🔗 API Endpoint (Contoh)

GET /api/users → Ambil data user\
POST /api/login → Login\
POST /api/absen → Proses absensi\
POST /api/rfid/read → Event RFID (planned)

---

## 🌱 Branch Workflow

main → Stable production\
development → Active development\
feature/face-recognition → Face Recognition system
feature/rfid-absensi → RFID system (PENDING)

---

## 🧠 Roadmap Pengembangan

-   [x] Setup Laravel + React
-   [x] Autentikasi user
-   [x] Dashboard absensi
-   [x] WebSocket realtime
-   [ ] RFID
-   [x] GPS Validation
-   [x] Face Recognition 

---

## 📌 Tujuan Project

Project ini dikembangkan sebagai:

-    Media pembelajaran Laravel + React + Realtime System

-    Studi kasus sistem absensi realtime modern

-    Implementasi Face Recognition

-    Portofolio Fullstack Web Developer

---

## 👨‍💻 Developer

Daffa Rahmatul A.Z\
Fullstack Web Developer\
Laravel | React | API | Realtime System

GitHub: https://github.com/daffarahmatul24

---

## 📝 Lisensi

Project ini bersifat **open-source** dan bebas digunakan untuk keperluan
edukasi.
