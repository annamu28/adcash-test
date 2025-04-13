#!/bin/bash

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
while ! mysqladmin ping -h"db" -P"3306" -u"adcash_user" -p"root" --silent; do
    sleep 1
done
echo "MySQL is ready!"

# Run migrations
php artisan migrate --force

# Start PHP-FPM
php-fpm 