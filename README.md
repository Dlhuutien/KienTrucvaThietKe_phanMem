# KienTrucvaThietKe_phanMem

## Description

KienTrucvaThietKe_phanMem is a microservices-based e-commerce platform simulation project. It demonstrates modern software architecture with independent services connected via an API Gateway, designed for scalability and maintainability.

## Technologies Used

- **Backend:** Java, Spring Boot, Spring Cloud, Spring Security
- **Frontend:** React.js
- **Database:** MariaDB (hosted on Railway)
- **Cache & Session Store:** Redis
- **Payment Gateway:** Stripe
- **Deployment:**
  - Frontend: Vercel
  - Backend (Dashboard): Render
- **Infrastructure:** Docker, Docker Compose, Eureka Server (Service Discovery), API Gateway
- **CI/CD:** GitHub Actions

## Integration

- Eureka Server handles service discovery for microservices.
- API Gateway acts as a single entry point connecting frontend with backend services.
- Redis is used for caching and session management to improve performance and reduce database load.
- Stripe is integrated for secure and efficient payment processing.
- CI/CD pipelines automatically build and deploy backend on Render and frontend on Vercel.
- MariaDB is managed on Railway, providing a cloud-based scalable database solution.

## Role

- Team Leader responsible for coordinating the project development.
- Designed and developed microservices using Spring Boot.
- Built frontend with React.js, interacting with backend via API Gateway.
- Set up and managed MariaDB database and Redis cache.
- Integrated Stripe payment gateway for handling payments.
- Configured deployments: frontend on Vercel and backend on Render.
- Automated build and deployment processes with GitHub Actions.
- Managed Docker and Docker Compose configurations for development and deployment environments.

## Database

- **MariaDB (Railway):** Main relational database storing user, product, order data.
- **Redis:** Cache and session storage to optimize performance.

## Backend

- Microservices implemented in Java with Spring Boot.
- Services include auth, user, product, order, payment, inventory, provider.
- Eureka Server for service discovery.
- Redis for caching and session management.
- Stripe payment integration.
- Backend deployed on Render platform.

## Frontend

- Built with React.js.
- Deployed on Vercel.
- Communicates with backend services through API Gateway.

## Architecture

- Microservices architecture with service discovery via Eureka.
- API Gateway as single entry point for all backend services.
- Redis used for caching and session management.
- MariaDB cloud database on Railway.
- Stripe payment gateway integrated.
- CI/CD pipelines for automatic build and deployment on Render and Vercel.

---

Feel free to contribute or fork this project for further improvements!
