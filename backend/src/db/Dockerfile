# Database creation
FROM mysql:latest

# Expose the default MySQL port
EXPOSE 3306
# Copy initialization scripts (if any)
COPY ./backup_uhospital.sql /docker-entrypoint-initdb.d/

# Start MySQL server
CMD ["mysqld"]
