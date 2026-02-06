# Community Myanmar Backend

Production-ready backend API for the Community Myanmar People platform.

## Features

- 🔐 JWT Authentication with refresh tokens
- 📝 News Feed with posts, likes, comments, shares
- 💬 Real-time chat with Socket.io
- 📁 File uploads via Cloudinary
- 🏘️ Community management
- 🔒 Security: bcrypt, rate limiting, input validation
- 📊 PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Cloudinary account (free tier)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env` and update the values:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `JWT_ACCESS_SECRET` & `JWT_REFRESH_SECRET`: Change to secure random strings
     - `CLOUDINARY_*`: Get from https://cloudinary.com
     - `FRONTEND_URL`: Your frontend URL (default: http://localhost:3000)

3. **Setup database:**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run migrations
   npm run prisma:migrate
   
   # (Optional) Seed sample data
   npm run prisma:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

Server will run on http://localhost:8000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### News Feed
- `GET /api/feed` - Get feed
- `POST /api/feed/posts` - Create post
- `POST /api/feed/posts/:id/like` - Like post
- `POST /api/feed/posts/:id/comments` - Comment on post

### Communities
- `GET /api/communities` - List communities
- `POST /api/communities` - Create community
- `POST /api/communities/:id/join` - Join community

### Chat
- `GET /api/chat/channels/:id/messages` - Get messages
- `POST /api/chat/channels/:id/messages` - Send message

### Files
- `POST /api/files/upload` - Upload file

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:studio` - Open Prisma Studio GUI
- `npm run prisma:migrate` - Run database migrations

## Security Features

- bcrypt password hashing (12 rounds)
- JWT with short-lived access tokens (15min)
- Refresh token rotation
- Rate limiting (100 requests/15min)
- CORS protection
- Helmet security headers
- Input validation with Zod
- SQL injection prevention via Prisma

## Production Deployment

1. Set `NODE_ENV=production`
2. Update `.env` with production values
3. Build: `npm run build`
4. Start: `npm start`

## License

ISC
