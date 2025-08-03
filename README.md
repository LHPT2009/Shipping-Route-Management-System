# Shipping Route Management System
This system will facilitate efficient management of shipping routes in the sea, providing users with a robust platform to handle route creation, management, and notifications seamlessly

## FEATURES
### Admin

| **Feature**                | **Description**                                               |
|----------------------------|--------------------------------------------------------------|
| **1. Dashboard**           | - Route, user, location, transport statistics               |
|                            | - Chart showing most traveled routes                         |
| **2. User management**     | - View list of users, export to excel                                         |
|                            | - View user information                                      |
|                            | - Assign role to specific users                              |
|                            | - Ban/unban specific users                                   |
| **3. Route management**    | - View list of routes, export to excel                                        |
|                            | - View, edit, create, delete route                          |
|                            | - View direction between two locations on map by coordinates |
| **4. Role management**     | - View list of roles, export to excel, import from excel      |
|                            | - View, edit, create, delete information                    |
|                            | - Assign permissions to role                                 |
| **5. Permission management**| - View list of permissions, export to excel                                   |
| **6. Authentication**      | - Login by system (with access token and refresh token)     |
|                            | - Logout                                                    |


  
### Customer

| **Feature**               | **Description**                                               |
|---------------------------|--------------------------------------------------------------|
| **1. Homepage**           | - Display system goals                                       |
|                           | - Introduce the services provided                            |
|                           | - Group information                                         |
| **2. Contact page**       | - Form to enter personal information to comment with AI               |
| **3. Route page**         | - View list of routes                                        |
|                           | - View route information                                      |
|                           | - View direction between two locations on map by coordinates  |
| **4. User profile page**  | - View user information                                      |
|                           | - Update user information                                    |
|                           | - Change password                                            |
| **5. Authentication**     | - Register account                                           |
|                           | - Login by system (with access token and refresh token)     |
|                           | - Login by Google                                           |
|                           | - Forgot password                                           |
|                           | - Email verification                                        |
|                           | - Logout                                                    |
| **6. Assistance**         | - Chat system supports users                                |


## TECHNOLOGIES
### Frontend
- Next.js with Typescript
- Redux Toolkit
- CSS modules, Ant design
- Mapbox for directions
- Socket.io
- Cloudinary for uploading user image
- Oauth2 with Google Authentication

### Backend
- NestJS with Typescript, TypeORM and Microservices
- Graphql Federation Monorepo
- Redis, gRPC, NestJS Socket
- Nodemailer, Kafka
- OpenAI GPT 4o mini
- Oauth2 with Google Authentication
- OOP Design pattern

### Database
- PostgresSQL
- DBeaver

## ARCHITECTURE
![architecture](https://github.com/LHPT2009/documents/architecture.png)

## DEMO
- Customer: https://youtu.be/wSjJWdKgENI
- Admin: https://youtu.be/KZkRGnqhZ04
- Backup (Onedrive): https://ynh33-my.sharepoint.com/:f:/g/personal/giahuy200202_ynh33_onmicrosoft_com/EkaSEOAU0B1HjPYCHfrENtoBUIUrsYlEXZPqusDkzR34yw?e=lgDYOY


## LOCAL INSTALLATIONS

Clone the project and make sure that you are in root folder.

### Backend

Step 1: Change directory to backend directory

```console
cd backend
```

Step 2: Start postgresdb, zookeeper, kafka, redis by docker
```console
docker-compose up --build
```

Step 3: Install all packages and dependencies
```console
npm i
```

Step 4: Run Auth service
```console
npm run start:dev auth
```

Step 5: Run Route service (Open new terminal)
```console
npm run start:dev route
```

Step 6: Run Notification service (Open new terminal)
```console
npm run start:dev notification
```

Step 6: Run gateway (Open new terminal)
```console
npm run start:dev
```

### Frontend

#### 1. Admin
Step 1: Change directory to frontend directory (Open new terminal)
```console
cd frontend/admin
```

Step 2:  Start app by docker
```console
docker-compose up --build
```

#### 2. Customer
Step 1: Change directory to frontend directory (Open new terminal)
```console
cd frontend/customer
```

Step 2:  Start app by docker
```console
docker-compose up --build
```

## GROUP MEMBERS
### Team 06 - JWAT Training Cyperlogitec Vietnam
![image](https://github.com//LHPT2009/documents/architecture.png)


