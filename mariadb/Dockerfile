FROM mariadb:10.5

ENV MYSQL_ROOT_PASSWORD=root
EXPOSE 3306 3308

# Fake HTTP Server để Render nhận diện
RUN apt-get update && apt-get install -y python3
CMD ["bash", "-c", "mysqld & python3 -m http.server 3308"]
