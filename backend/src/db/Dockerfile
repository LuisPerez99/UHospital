# Database creation
FROM mysql:latest

# Set environment variables for MySQL
ENV MYSQL_USER_PASSWORD=${DB_PASSWORD}
ENV MYSQL_DATABASE=${DB_NAME}
ENV MYSQL_USER=${DB_USER}
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
# Expose the default MySQL port
EXPOSE ${DB_PORT}
# Copy initialization scripts (if any)
COPY ./backup_uhospital.sql /docker-entrypoint-initdb.d/
# Start MySQL server
CMD ["mysqld"]
