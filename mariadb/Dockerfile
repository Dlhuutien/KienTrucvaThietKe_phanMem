FROM mariadb:10.5

# Cấu hình biến môi trường MariaDB
ENV MYSQL_ROOT_PASSWORD=root

# Cài fake HTTP server (cổng 3308)
RUN apt-get update && apt-get install -y python3

# Script để khởi chạy cả MySQL + fake HTTP server
COPY run.sh /run.sh
RUN chmod +x /run.sh

EXPOSE 3306 3308

CMD ["bash", "/run.sh"]
