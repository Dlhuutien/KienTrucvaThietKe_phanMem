#!/bin/bash

# Khởi động MariaDB (dưới user mặc định là mysql, không phải root)
/usr/local/bin/docker-entrypoint.sh mysqld &

# Chạy HTTP server giả để Render không kill service vì không có HTTP response
python3 -m http.server 3308
