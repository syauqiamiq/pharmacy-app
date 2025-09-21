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

## 📋 Live Preview

- **Live Preview**: https://pharmacy-demo.okispace.my.id/

## 📋 Prerequisites

### System Requirements

- **PHP** >= 8.2
- **Node.js** >= 18.0
- **Composer** >= 2.0
- **NPM** >= 9.0

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

## 👨‍💻 Default Login Credentials

Setelah menjalankan `php artisan migrate --seed`:

```
Admin:
Email: admin@dev.com
Password: admin123123

Doctor:
Email: doctor@dev.com
Password: doctor123123

Pharmacist:
Email: pharmacist@dev.com
Password: pharmacist123123
```

## Database Design

![ERD Database](/PharmacyERD.png)

## Source Code Design Pattern

![Source Code Design Pattern](/DesignPattern.png)

- **Database Layer**: Layer untuk komunikasi ke database, dalam hal ini menggunakan Model Eloquent
- **Service Layer**: Layer untuk memproses logic utama dari suatu bisnis proses, dalam hal ini terletak pada folder /app/Http/Services
- **Service Layer**: Layer untuk memproses request dan response yang diminta oleh client, dalam hal ini terletak pada folder /app/Http/Controllers

**Dibuat untuk tes teknikal posisi IT Programmer di RS Delta Surya Sidoarjo**  
_Demonstrating modern full-stack development with Laravel & React_
