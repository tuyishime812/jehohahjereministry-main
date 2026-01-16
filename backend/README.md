# Jehovah Jire Ministry - Backend

This is the backend server for the Jehovah Jire Ministry website, built with Node.js, Express, and MongoDB.

## Features

- User authentication system (register/login)
- Content management system for website pages
- Contact form handling
- Media upload functionality
- Admin panel with dashboard statistics
- Team member management
- Testimonial management
- Blog post management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (either local installation or cloud instance like MongoDB Atlas)

### Setting up MongoDB

You have two options for setting up MongoDB:

#### Option 1: Local MongoDB Installation
1. Download and install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service
3. Use the default connection string: `mongodb://localhost:27017/jehovahjire`

#### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Add your IP address to the whitelist
5. Copy the connection string and update your `.env` file

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jehovah-jire-ministry/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/jehovahjire

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Email Configuration (for contact form)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@jehovahjireministry.org

# Server Configuration
PORT=5000
NODE_ENV=development
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Content Management
- `GET /api/content/:page` - Get content for a specific page
- `GET /api/content` - Get all content (requires auth)
- `POST /api/content` - Create or update content (requires auth)
- `DELETE /api/content/:id` - Delete content (requires auth)

### Team Members
- `GET /api/content/team/members` - Get all team members
- `POST /api/content/team/members` - Add a team member (requires auth)
- `PUT /api/content/team/members/:id` - Update a team member (requires auth)
- `DELETE /api/content/team/members/:id` - Delete a team member (requires auth)

### Testimonials
- `GET /api/content/testimonials` - Get all testimonials
- `POST /api/content/testimonials` - Add a testimonial (requires auth)
- `PUT /api/content/testimonials/:id` - Update a testimonial (requires auth)
- `DELETE /api/content/testimonials/:id` - Delete a testimonial (requires auth)

### Contact Forms
- `POST /api/contact/submit` - Submit a contact form
- `GET /api/contact/submissions` - Get all contact form submissions (requires auth)
- `PATCH /api/contact/submissions/:id` - Update submission status (requires auth)

### Media Upload
- `POST /api/media/upload` - Upload media files (requires auth)
- `GET /api/media/list` - List all uploaded media files

### Admin Panel
- `GET /api/admin/dashboard-stats` - Get admin dashboard statistics (requires auth)
- `GET /api/admin/users` - Get all users (requires auth)
- `PATCH /api/admin/users/:userId/role` - Update user role (requires auth)
- `PATCH /api/admin/users/:userId/toggle-status` - Toggle user active status (requires auth)

## Default Admin User

On first run, a default admin user will be created:
- Username: `admin`
- Password: `jehovah123`

## Frontend Integration

The backend is designed to work with the frontend files in the parent directory. The frontend uses localStorage to temporarily store content changes, but with this backend, content will be persisted in the database.

## Security Notes

- Change the JWT secret in production
- Use strong passwords for database connections
- Enable authentication for all sensitive endpoints
- Regularly update dependencies

## License

This project is licensed under the MIT License.