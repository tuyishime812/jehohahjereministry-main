# Jehovah Jire Ministry - Full Project

This is the complete Jehovah Jire Ministry website with both frontend and backend components.

## Project Structure

- **Frontend**: HTML/CSS/JS files for the public website and admin panel
- **Backend**: Node.js/Express server with MongoDB database

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (either local installation or cloud instance like MongoDB Atlas)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your MongoDB connection in the `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/jehovahjire?retryWrites=true&w=majority
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   
   The backend will run on `http://localhost:5000`

### 2. Frontend Setup

The frontend consists of static HTML files that connect to your backend API.

1. To serve the frontend files, you can use a simple HTTP server like `http-server`:
   ```bash
   # Install http-server globally (if not already installed)
   npm install -g http-server
   
   # Run from the main project directory (not the backend directory)
   http-server
   ```

2. The frontend will be available at `http://localhost:8080` (or another port if 8080 is taken)

### 3. Admin Panel

1. Access the admin panel at `http://localhost:8080/admin.html` (or your server's address)
2. Login with your admin credentials
3. Manage your website content which will be saved to the MongoDB database

## API Endpoints Used by Frontend

The frontend connects to these backend endpoints:

- `GET /api/content/:page` - Get content for specific pages
- `POST /api/content` - Save content (requires authentication)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/contact/submit` - Submit contact form

## Features

- **Content Management**: Update website content through the admin panel
- **User Authentication**: Secure admin access with JWT tokens
- **Contact Forms**: Securely submit and manage contact form submissions
- **Team Management**: Manage team members and their information
- **Testimonials**: Manage testimonials from beneficiaries
- **Responsive Design**: Works on all device sizes

## Running the Project

1. Start the backend server: `npm run dev` in the `backend` directory
2. Start the frontend server: `http-server` in the main directory
3. Access the website at the frontend server URL
4. Access the admin panel at `/admin.html`

## Security Notes

- Change the default JWT secret in production
- Use strong passwords for database connections
- Enable authentication for all sensitive endpoints
- Regularly update dependencies

## Troubleshooting

If you encounter issues:
1. Make sure MongoDB is connected and accessible
2. Verify your `.env` file has correct database credentials
3. Check that the backend server is running on the correct port
4. Ensure frontend files are served from the correct directory

## License

This project is licensed under the MIT License.