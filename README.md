A RESTful Express.js backend that powers the MovieBrowser app. Handles authentication, movie data proxying from TMDB, and personal favourites stored in MongoDB.

Tech Stack
Node.js + Express
MongoDB + Mongoose
JSON Web Tokens (JWT)
bcryptjs
cookie-parser
axios
dotenv

Features
JWT authentication with httpOnly cookies
TMDB API proxy — keeps your API key server-side
Per-user favourites stored in MongoDB
Protected routes via auth middleware
CORS configured for cross-origin frontend


Register / Login request body:
{
  "username": "yourname",
  "email": "you@example.com",
  "password": "yourpassword"
}

Response:
{
  "user": {
    "id": "64abc123...",
    "username": "yourname",
    "email": "you@example.com"
  }
}


Authentication Flow
Authentication uses JWT tokens stored in httpOnly cookies — the token is never accessible via JavaScript, protecting against XSS attacks.
1. User registers or logs in
2. Server verifies credentials
3. Server generates JWT token (expires in 7 days)
4. Token set as httpOnly cookie in response
5. Browser sends cookie automatically with every request
6. Auth middleware verifies token on protected routes

Deployment
This backend is deployed on Render.
