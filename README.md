
# 🛒 ASE Verto Challenge — Advanced E-Commerce Microservices Solution

- This project was developed as part of the Verto Hackathon Shortlisting Challenge, where the goal was to build a simple shopping cart system.
- I extended the task into a fully containerized, microservices-based e-commerce architecture to demonstrate scalability, reliability, and production-ready design.
## 🎯 Challenge Overview

Given Task (by Verto) : "Build a minimal e-commerce site to list products and manage a shopping cart".

Core Requirements   
- Backend endpoints for:
    -  Listing hardcoded products
    - Accepting a cart order and logging it

- Frontend for:
    - Viewing products
    - Adding items to cart
    - Managing cart state and checkout

Bonus Points
- Editable quantities
- Persist cart in localStorage
- Basic backend tests
## 💡 My Implementation

- I reimagined the challenge using Spring Boot microservices, ReactJS frontend, and Docker for containerized deployment.
- The system follows a distributed architecture with authentication, fault tolerance, async messaging, and centralized API management.
## 🏗️ System Architecture

⚙️ Backend Microservices

- API Gateway : Routes client requests and provides global Swagger API documentation
- Auth Server (Keycloak) : Handles authentication and authorization using OAuth2
- Product Service : Manages product catalog and product-related APIs
- Order Service : Processes orders, interacts with Inventory and Notification services
- Inventory Service : Maintains stock and synchronizes with Order Service
- Notification Service : Sends notifications asynchronously using Kafka

- Key Components
    - Spring Boot Microservices
    - Spring Cloud Gateway
    - Resilience4J for Circuit Breakers and Fault Tolerance
    - Apache Kafka for asynchronous communication
    - PostgreSQL and MongoDB for data persistence
    - OpenAPI/Swagger for REST API documentation
    - Docker for containerization
    - Keycloak for authentication and role-based access control

💻 Frontend (ReactJS)

- Features
    - User authentication via Keycloak
    - Product listing and search functionality
    - Add to Cart and Place Order flows
    - Cart and Order management pages
    - Token interceptor for refreshing expired access tokens
    - User Profile modal and logout functionality
    - Custom branding (logo and name)
      

## 🧩 High-Level Design (HLD)

<img width="727" height="500" alt="High-Level Design (HLD)" src="https://github.com/user-attachments/assets/ccb8afa2-5eb9-429c-80b4-a07a14073a23" />

## 🧰 Tech Stack

- Frontend : 
    - ReactJS 
    - Axios 
    - Keycloak JS Adapter 

- Backend : 
    - Spring Boot 
    - Spring Cloud 
    - Kafka 
    - PostgreSQL 
    - MongoDB
    - Resilience4J
    - Swagger

- Security: 
    - Keycloak

- DevOps: 
    - Docker  
    - Docker Compose
## ⚙️ Setup and Run Instructions

Setup Instructions
- Backend : 
    - Clone the repository: git clone <add_github_link>
    - Install and setup JDK 21
    - Install Docker Deckstop : https://docs.docker.com/desktop/
    - IDE : IntelliJ IDEA Community Edition(Recommended) https://www.jetbrains.com/idea/download
- Forntend : 
    - Node.js (v22+) https://nodejs.org/en/download
    - npm (v10+) (comes with Node)
    - IDE : VSCode

Run Instructions
- Backend
    - Springboot Application : "mvn spring-boot:run" or by dedicated button present in IDE (IntelliJ IDEA)
    - Docker : "docker-compose up -d" (In project root directory path) 
- Forntend
    - ReactJS : "npm run dev" (In project root directory path) 

Access the application
- Frontend: http://localhost:5173/
- API Gateway Swagger: http://localhost:9001/swagger-ui/index.html
- Keycloak: http://localhost:8181/
- Kafka : http://localhost:8086/ui/clusters/
    - Kafka Cluster 
        - Cluster name: localhost
        - Bootstrap Servers: broker 
            - Port : 29092
    - Validate
    - Submit (If get success on validate) 
- Database : to see data in database 
    - PostgreSQL: download PgAdmin Tool(v8+) https://www.postgresql.org/ftp/pgadmin/pgadmin4/v8.14/windows/
        - Order Service : 
            - Step 1: Right Click on Servers -> Register -> Server...
            - Step 2: 
                - General ->  name: Verto Order Service Server
                - Connection -> Host name/address: localhost 
                - Connection -> port: 5436
                - Connection -> Username: postgres
                - Connection -> Password: verto
        - Inventory Service
            - Step 1: Right Click on Servers -> Register -> Server...
            - Step 2: 
                - General ->  name: Verto Inventory Service Server
                - Connection -> Host name/address: localhost 
                - Connection -> port: 5430
                - Connection -> Username: postgres
                - Connection -> Password: verto
    - MongoDB: download MongoDB Compass(v1.46.11) https://www.mongodb.com/try/download/compass
        - Product Service
            - Step 1: Add new Connection
            - Step 2: URI : mongodb://localhost:27019
            - Step 3: Advanced Connection Options
                - Authentication: 
                    - Username: mongo
                    - Password: verto
## 🚀 Future Enhancements

- Integrate payment gateway (Razorpay / Stripe)
- Add order history and tracking
- Implement admin dashboard for analytics
- Enhance notification system (SMS)
## 👤 Author

Harsh Gharge | B.Tech | Computer Sciece and Engineering | 
Project Intern @CDAC Mumbai R&D 
