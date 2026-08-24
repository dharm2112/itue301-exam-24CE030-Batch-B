# QuickBite Food Ordering System

An end-to-end full-stack web application developed for the Advanced Web Development Frameworks practical examination.

## Project Description

QuickBite is a food ordering system built using the MERN stack (MongoDB, Express.js, React, Node.js). It enables customers to view available restaurants, search by cuisine or name, authenticate using JWT, and place food orders online.

## Features

- **Customer Authentication**: Secure JWT-based customer login without hardcoding user credentials.
- **Restaurant Catalog**: Displays live restaurant listings from MongoDB.
- **Client-Side Search**: Instant filtering of restaurants by name or cuisine without duplicate API requests.
- **Protected Ordering**: Route protection ensuring only authenticated customers can place orders (`/order`).
- **Dynamic Order Creation**: Food order placement returning `HTTP 201 Created` and persisting to MongoDB.
- **Order Status Tracking**: Update order status via backend PATCH endpoint (`pending`, `preparing`, `out-for-delivery`, `delivered`, `cancelled`).
- **Code-Split Admin Route**: Lazy-loaded Admin panel using `React.lazy()` and `<Suspense>`.
- **Custom Logging & Error Handling**: Custom `requestLogger` and global `errorHandler` middleware.

## Project Structure

```text
internal/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── README.md
└── .gitignore
```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=quickbite_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## MongoDB Setup

1. Ensure MongoDB Community Server is running locally (e.g. `mongodb://localhost:27017/quickbite`) or configure MongoDB Atlas.
2. Specify your connection string in `backend/.env` under `MONGO_URI`.
3. (Optional) Run the one-time sample data seeder:
   ```bash
   cd backend
   node seed.js
   ```

## Environment Variables

The following environment variables are required in `backend/.env`:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection URI | `mongodb://localhost:27017/quickbite` |
| `JWT_SECRET` | Secret key for JWT signing | `quickbite_secret` |

*Note: Never commit your real `.env` file to version control. An template is provided in `.env.example`.*

## API Endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/v1/health` | Public | Server health check |
| `POST` | `/api/v1/auth/login` | Public | Customer email authentication & JWT issuance |
| `GET` | `/api/v1/restaurants` | Public | Retrieve all restaurants from MongoDB |
| `POST` | `/api/v1/orders` | Protected (`Bearer`) | Create new food order (Returns HTTP 201 Created) |
| `GET` | `/api/v1/orders` | Protected (`Bearer`) | Retrieve logged-in customer's orders with `.populate()` |
| `PATCH` | `/api/v1/orders/:id/status` | Protected (`Bearer`) | Update order status enum |

## Testing

APIs can be tested using Postman or Thunder Client:
1. Call `POST /api/v1/auth/login` with `{"email": "alex@example.com"}` to receive a JWT token.
2. Call `POST /api/v1/orders` passing header `Authorization: Bearer <TOKEN>` to verify `201 Created` status response.

## Technologies Used

- **Frontend**: React 19, React Router 7, Vite, Native CSS
- **Backend**: Node.js, Express.js, Mongoose 8, JSON Web Token (JWT)
- **Database**: MongoDB
