# Campaign Management Tool

A full-stack application for managing marketing campaigns with country-specific payouts. Built with React, TypeScript, and Laravel.

## Project Structure

```
.
├── frontend/           # React + TypeScript frontend
│   ├── src/           # Source files
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
│
└── backend/           # Laravel backend
    ├── app/          # Application code
    ├── database/     # Migrations and seeds
    ├── routes/       # API routes
    └── composer.json # Backend dependencies
```

## Features

- User authentication (login/register)
- Campaign management
  - Create new campaigns
  - Set country-specific payouts (Estonia, Spain, Bulgaria)
  - Activate/pause campaigns
  - Search and filter campaigns
- Responsive design
- CSRF protection
- API authentication with Sanctum

## Prerequisites

- Node.js (v16 or higher)
- PHP 8.2 or higher
- MySQL 5.7 or higher
- Composer
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Configure your database in `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=campaign_management
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. Run migrations:
   ```bash
   php artisan migrate
   ```

7. Start the backend server:
   ```bash
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Campaigns
- `GET /api/campaigns` - List all campaigns
- `POST /api/campaigns` - Create a new campaign
- `PATCH /api/campaigns/{id}/status` - Update campaign status

## Development

### Backend Development
- The backend uses Laravel's API resources for data transformation
- Authentication is handled by Laravel Sanctum
- CSRF protection is enabled for all routes
- Database migrations are version controlled

### Frontend Development
- Built with React and TypeScript
- Uses Material-UI for components
- Form handling with Formik and Yup validation
- State management with React Context
- API calls handled by Axios

## Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the backend:
   ```bash
   cd backend
   composer install --optimize-autoloader --no-dev
   php artisan config:cache
   php artisan route:cache
   ```

## License

This project is licensed under the MIT License.