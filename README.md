# 🏥 Pharmacy Management System

Sistem manajemen farmasi rumah sakit yang terintegrasi dengan fitur role-based access control, manajemen resep, dan dashboard interaktif.

## 📋 Summary

Aplikasi ini merupakan sistem manajemen farmasi modern yang dikembangkan untuk rumah sakit, mencakup:

- **Role-based Authentication** - Sistem login dengan role Doctor, Pharmacist, dan Admin
- **Patient Management** - CRUD lengkap untuk data pasien (Admin only)
- **Visit Management** - Pencatatan kunjungan pasien dan dokter
- **Prescription System** - Manajemen resep dan obat-obatan serta penagihan invoice resep
- **Prescription Logging** - Log aktivitas perubahan data pada Resep Obat
- **Responsive Dashboard** - Dashboard interaktif untuk setiap role

## 🛠 Tech Stack

### Backend

- **Laravel 12** - PHP Framework
- **PHP 8.2+** - Programming Language
- **MySQL 8.0** - Database
- **Inertia.js** - Full-stack Framework

### Frontend

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling Framework
- **Ant Design** - Component Library
- **React Hook Form** - Form Management
- **React Query** - Data Fetching

### Development Tools

- **Vite** - Build Tool
- **ESLint** - Code Linting
- **Prettier** - Code Formatting
- **PHP Inteliphense** - PHP Code Style

## 🚀 Cara Menjalankan

### 1. Clone Repository

```bash
git clone <repository-url>
cd pharmacy-app
```

### 2. Install Dependencies

```bash
# Backend dependencies
composer install

# Frontend dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Setup database
php artisan migrate --seed
```

### 4. Storage Setup

```bash
# Create storage link
php artisan storage:link

# Clear cache
php artisan cache:clear
php artisan config:clear
```

### 5. Run Development Server

```bash
composer run dev
```

### 6. Access Application

- **Web Application**: http://localhost:8000
- **API Endpoints**: http://localhost:8000/api/v1

## 📋 Prerequisites

### System Requirements

- **PHP** >= 8.2
- **Node.js** >= 18.0
- **Composer** >= 2.0
- **NPM** >= 9.0

## 🏆 Scoring Points (DRAFT)

### 1. ✅ Kesesuaian Fitur dengan Guideline

- **Complete CRUD Operations** untuk semua entitas (Patient, Visit, Prescription, dll)
- **Role-based Access Control** dengan middleware `check-roles`
- **API Endpoints** mengikuti standar RESTful
- **Form Validation** dengan custom messages bahasa Indonesia
- **File Management** dengan authentication

### 2. ✅ Estetika (UI) dan Kemudahan Pengoperasian (UX)

- **Responsive Design** dengan Tailwind CSS
- **Modern UI Components** menggunakan Ant Design
- **Interactive Dashboard** untuk setiap role pengguna
- **Intuitive Navigation** dengan sidebar dan menu yang jelas
- **Loading States** dan error handling yang baik
- **Mobile-friendly** layout

### 3. ✅ Penerapan Coding Style (PSR-12)

- **Laravel Pint** untuk PHP code formatting
- **ESLint + Prettier** untuk JavaScript/TypeScript
- **Consistent Naming Convention** di seluruh codebase
- **Proper File Structure** dan organization
- **Type Safety** dengan TypeScript

### 4. ✅ Pengimplementasian Design Pattern

- **Repository Pattern** dengan Service Layer
- **Resource Pattern** untuk API responses
- **Request Pattern** untuk validation
- **Middleware Pattern** untuk authentication & authorization
- **Observer Pattern** untuk logging activities
- **Factory Pattern** untuk database seeding

### 5. ✅ Struktur Database

- **Normalized Database** dengan proper relationships
- **UUID Primary Keys** untuk security
- **Soft Deletes** untuk data integrity
- **Timestamps** untuk audit trail
- **Foreign Key Constraints** untuk referential integrity
- **Indexes** untuk performance optimization

### 6. ✅ Poin Tambahan - Pengumpulan Cepat

- **Development Ready** setup dengan detailed documentation
- **Automated Setup** dengan migration dan seeder
- **Quick Start Guide** dengan step-by-step instructions

### 7. ✅ Poin Tambahan - Activity Logging

- **Prescription Logs** untuk tracking perubahan resep
- **User Activity Tracking** untuk audit trail
- **Database Logging** dengan timestamp dan user info
- **Comprehensive Audit Trail** untuk compliance

## 👨‍💻 Default Login Credentials

Setelah menjalankan `php artisan migrate --seed`:

```
Admin:
Email: admin@example.com
Password: admin123123

Doctor:
Email: doctor@example.com
Password: doctor123123

Pharmacist:
Email: pharmacist@example.com
Password: pharmacist123123
```

**Dibuat untuk tes teknikal posisi IT Programmer di RS Delta Surya Sidoarjo**  
_Demonstrating modern full-stack development with Laravel & React_
