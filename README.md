# Shipping Route Management System
This system will facilitate efficient management of shipping routes in the sea, providing users with a robust platform to handle route creation, management, and notifications seamlessly

## GROUP MEMBERS
### Team 06 - JWAT Training Cyperlogitec Vietnam
- Tran Dam Gia Huy
- Le Huynh Phuong Tung

## FEATURES
### Admin

| **Feature**                | **Description**                                               |
|----------------------------|--------------------------------------------------------------|
| **1. Dashboard**           | - Route, user, location, transport statistics               |
|                            | - Chart showing most traveled routes                         |
| **2. User management**     | - View list of users                                         |
|                            | - View user information                                      |
|                            | - Assign role to specific users                              |
|                            | - Ban/unban specific users                                   |
| **3. Route management**    | - View list of routes                                        |
|                            | - View, edit, create, delete route                          |
|                            | - View direction between two locations on map by coordinates |
| **4. Role management**     | - View list of roles                                         |
|                            | - View, edit, create, delete information                    |
|                            | - Assign permissions to role                                 |
| **5. Permission management**| - View list of permissions                                   |
| **6. Authentication**      | - Login by system (with access token and refresh token)     |
|                            | - Logout                                                    |


  
### Customer

| **Feature**               | **Description**                                               |
|---------------------------|--------------------------------------------------------------|
| **1. Homepage**           | - Display system goals                                       |
|                           | - Introduce the services provided                            |
|                           | - Group information                                         |
| **2. Contact page**       | - Form to enter personal information to contact              |
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


## TECHNOLOGIES
### Frontend
- Next.js with Typescript
- Redux Toolkit
- CSS modules, Ant design
- Mapbox for directions

### Backend
- NestJS with Typescript
- OOP Design pattern

### Database
- PostgresSQL
- DBeaver

## LOCAL INSTALLATIONS

Clone the project and make sure that you are in root folder.

### Backend

Step 1: Change directory to backend directory

```console
cd backend
```

Step 2: Start postgresdb by docker
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
Open new terminal
Step 1: Change directory to frontend directory
```console
cd frontend/admin
```

Step 2: Install all packages and dependencies of each service
```console
npm i
```

Step 3: Run next.js app
```console
npm run dev
```

#### 2. Customer
Step 1: Change directory to frontend directory (Open new terminal)
```console
cd frontend/customer
```

Step 2: Install all packages and dependencies of each service
```console
npm i
```

Step 3: Run next.js app
```console
npm run dev
```
