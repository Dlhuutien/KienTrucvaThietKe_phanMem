# Sử dụng image chính thức của MariaDB
FROM mariadb:10.5

# Thiết lập biến môi trường cho database
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=authdb

# Expose port MariaDB
EXPOSE 3306

# Khởi động MariaDB
CMD ["mysqld"]
