# Hotel Booking System

A full-stack hotel booking application built with React frontend and Spring Boot backend.

## Project Structure

- `hotel-frontend/` - React.js frontend application
- `hotel-backend/` - Spring Boot Java backend application

## Prerequisites

- Java 17 or higher
- Maven 3.0 or higher
- MySQL 8.0 or higher

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd hotel-backend
   ```

2. Configure MySQL database:
   - Create a database named `hotelbooking`
   - Update `src/main/resources/application.properties` with your database credentials
   

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   
   The backend will start on `http://localhost:8080`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd hotel-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   
   The frontend will start on `http://localhost:3000`

## Features

- User authentication (login/register)
- Hotel listing and room browsing
- Room booking with date selection
- JWT-based authentication
- Responsive design

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/{id}` - Get hotel by ID

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/hotel/{hotelId}` - Get rooms by hotel ID
- `GET /api/rooms/{id}` - Get room by ID

### Bookings
- `GET /api/bookings` - Get all bookings (authenticated)
- `POST /api/bookings` - Create new booking (authenticated)
- `GET /api/bookings/{id}` - Get booking by ID (authenticated)

## Development

- Frontend proxy is configured to forward API calls to `http://localhost:8080`
- Backend includes CORS configuration for `http://localhost:3000`
- JWT tokens are stored in localStorage for authentication

## Troubleshooting

1. **Database Connection Issues**: Ensure MySQL is running and credentials are correct
2. **Port Conflicts**: Check if ports 8080 (backend) and 3000 (frontend) are available
3. **CORS Issues**: Verify backend CORS configuration matches frontend URL
4. **Build Errors**: Run `npm install` and check for dependency conflicts

## Security Features

- JWT-based authentication
- Password encryption with BCrypt
- CORS configuration
- Protected API endpoints
- Session management 
