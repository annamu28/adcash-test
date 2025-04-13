# Campaign Management Tool - Backend

This is the backend for the Campaign Management Tool, built with Laravel.

## Prerequisites

- PHP 8.1 or higher
- Composer
- MySQL or PostgreSQL
- Node.js and npm (for frontend)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd adcash-test/backend
```

### 2. Install dependencies

```bash
composer install
```

### 3. Configure environment variables

Copy the example environment file and update it with your database credentials:

```bash
cp .env.example .env
```

Edit the `.env` file and update the following variables:
- `DB_CONNECTION` (mysql or pgsql)
- `DB_HOST` (usually localhost)
- `DB_PORT` (3306 for MySQL, 5432 for PostgreSQL)
- `DB_DATABASE` (your database name)
- `DB_USERNAME` (your database username)
- `DB_PASSWORD` (your database password)

### 4. Generate application key

```bash
php artisan key:generate
```

### 5. Run database migrations

```bash
php artisan migrate:fresh
```

### 6. Start the development server

```bash
php artisan serve
```

The backend will be available at `http://localhost:8000`.

## API Documentation

The API provides the following endpoints:

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login a user
- `POST /api/logout` - Logout a user

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create a new campaign
- `PATCH /api/campaigns/{id}/status` - Update campaign status

## Docker Setup (Alternative)

If you prefer to use Docker:

```bash
# Start the containers
./docker-compose.sh up

# Stop the containers
./docker-compose.sh down
```

## Troubleshooting

- If you encounter permission issues, run `chmod +x docker-compose.sh`
- If the database connection fails, ensure your database server is running
- For CSRF token issues, make sure your frontend is configured to include the CSRF token in requests