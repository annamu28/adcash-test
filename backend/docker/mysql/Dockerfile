FROM mysql:8.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=adcash_test
ENV MYSQL_USER=adcash_user
ENV MYSQL_PASSWORD=root

# Copy custom MySQL configuration if needed
COPY my.cnf /etc/mysql/conf.d/

# Expose MySQL port
EXPOSE 3306

# Set character set and collation
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"] 