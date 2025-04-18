cd auth_service
mvn clean package -DskipTests
cd ..

cd user_service
mvn clean package -DskipTests
cd ..

cd order_service
mvn clean package -DskipTests
cd ..

cd product_service
mvn clean package -DskipTests
cd ..

cd provider_service
mvn clean package -DskipTests
cd ..

cd inventory_service
mvn clean package -DskipTests
cd ..

cd api-gateway
mvn clean package -DskipTests
cd ..

cd eureka_server
mvn clean package -DskipTests
cd ..

@REM ./build-all.bat
@REM docker-compose down -v --remove-orphans
@REM docker-compose build --no-cache
@REM docker-compose up -d
