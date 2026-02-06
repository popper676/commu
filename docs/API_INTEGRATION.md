# API Integration Guide

This document outlines the API integration for the Myanmar Community Platform, detailing the contracts between the Next.js frontend and the Django/Spring Boot backends.

## Architecture Overview

```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
         ├──────────────────┬──────────────────┐
         │                  │                  │
         ▼                  ▼                  ▼
┌─────────────────┐  ┌─────────────┐  ┌──────────────┐
│  Django Backend │  │  WebSocket  │  │  Spring Boot │
│ (Social/Content)│  │   (Chat)    │  │  (Payments)  │
└─────────────────┘  └─────────────┘  └──────────────┘
```

## Backend Services

### 1. Django Backend (Port 8000)
**Responsibilities**: User management, communities, courses, challenges, content

**Base URL**: `http://localhost:8000/api`

### 2. Spring Boot Backend (Port 8080)
**Responsibilities**: Payments, subscriptions, transactions, invoicing

**Base URL**: `http://localhost:8080/api`

### 3. WebSocket Server (Django Channels)
**Responsibilities**: Real-time chat, notifications

**URL**: `ws://localhost:8000/ws`

---

## API Endpoints

### Authentication (Django)

#### POST `/auth/signup`
Create a new user account.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "CREATOR" | "LEARNER",
  "plan": "MONTHLY" | "YEARLY" | "FREE"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "CREATOR",
      "plan": "MONTHLY"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/auth/login`
Authenticate user and get token.

**Request**:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "token": "jwt_token_here"
  }
}
```

#### GET `/auth/me`
Get current authenticated user.

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CREATOR"
  }
}
```

---

### Communities (Django)

#### GET `/communities`
Get list of communities with optional filters.

**Query Parameters**:
- `category` (optional): Filter by category
- `search` (optional): Search by name
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "comm_123",
      "name": "Tech Pioneers",
      "nameMm": "နည်းပညာ ရှေ့ဆောင်များ",
      "description": "...",
      "category": "Technology",
      "members": 1250,
      "isPaid": true,
      "entryFee": 50000,
      "channels": [...]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

#### POST `/communities/{id}/join`
Join a community.

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "data": {
    "message": "Successfully joined community"
  }
}
```

---

### Courses (Django)

#### GET `/courses`
Get list of courses with filters.

**Query Parameters**:
- `category` (optional)
- `level` (optional): BEGINNER | INTERMEDIATE | ADVANCED
- `search` (optional)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "course_123",
      "title": "Web Development Fundamentals",
      "instructor": "John Doe",
      "price": 50000,
      "level": "BEGINNER",
      "modules": [...],
      "rating": 4.8
    }
  ]
}
```

#### POST `/courses/{id}/enroll`
Enroll in a course (requires payment if not free).

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "data": {
    "enrollment": {
      "courseId": "course_123",
      "userId": "user_123",
      "enrolledAt": "2024-02-04T12:00:00Z",
      "progress": 0
    }
  }
}
```

#### POST `/courses/{id}/progress`
Update lesson progress.

**Request**:
```json
{
  "lessonId": "lesson_456",
  "completed": true
}
```

---

### Challenges (Django)

#### GET `/challenges`
Get list of challenges.

**Query Parameters**:
- `status` (optional): ACTIVE | JUDGING | CLOSED
- `category` (optional)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "challenge_123",
      "title": "Design Challenge 2024",
      "prize": "$500 Cash Prize",
      "deadline": "2024-03-01T00:00:00Z",
      "status": "ACTIVE",
      "submissions": 45
    }
  ]
}
```

#### POST `/challenges/{id}/submit`
Submit entry to challenge.

**Request**:
```json
{
  "description": "My submission description",
  "files": ["url1", "url2"]
}
```

---

### Payments (Spring Boot)

#### POST `/payments/subscribe`
Subscribe to a creator plan.

**Request**:
```json
{
  "plan": "MONTHLY" | "YEARLY",
  "paymentMethod": "KPAY" | "WAVEPAY" | "AYAPAY" | "VISA"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "sub_123",
      "plan": "MONTHLY",
      "status": "ACTIVE",
      "nextBillingDate": "2024-03-04T00:00:00Z"
    },
    "paymentUrl": "https://payment.example.com/checkout/..."
  }
}
```

#### POST `/payments/courses/purchase`
Purchase a course.

**Request**:
```json
{
  "courseId": "course_123",
  "paymentMethod": "KPAY"
}
```

---

## WebSocket Protocol (Chat)

### Connection
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/communities/{communityId}/channels/{channelId}');
```

### Message Format

**Send Message**:
```json
{
  "type": "message",
  "content": "Hello world!",
  "attachments": []
}
```

**Receive Message**:
```json
{
  "type": "message",
  "id": "msg_123",
  "userId": "user_456",
  "userName": "John Doe",
  "content": "Hello world!",
  "timestamp": "2024-02-04T12:00:00Z"
}
```

---

## Error Handling

All API responses follow this structure for errors:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

### Error Codes
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid input data
- `SERVER_ERROR`: Internal server error
- `NETWORK_ERROR`: Network connectivity issue

---

## Mock Mode

The frontend includes a mock mode for development without backends:

```typescript
// In .env
NEXT_PUBLIC_USE_MOCK=true
```

When enabled, all API calls return mock data with simulated delays.

---

## File Upload

### POST `/upload/image`
Upload an image file.

**Request**: `multipart/form-data`
- `file`: Image file (max 10MB)

**Response**:
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.example.com/images/abc123.jpg"
  }
}
```

### POST `/upload/video`
Upload a video file.

**Request**: `multipart/form-data`
- `file`: Video file (max 100MB)

### POST `/upload/document`
Upload a document file.

**Request**: `multipart/form-data`
- `file`: Document file (max 10MB)

---

## Authentication Flow

1. User signs up → Receive JWT token
2. Store token in localStorage
3. Include token in all authenticated requests: `Authorization: Bearer {token}`
4. Token expires after 24 hours
5. Use `/auth/refresh` to get new token

---

## Next Steps for Backend Teams

### Django Team
1. Implement authentication endpoints
2. Create models for Community, Course, Challenge
3. Set up Django Channels for WebSocket
4. Implement file upload with S3/CloudFlare
5. Add pagination and filtering

### Spring Boot Team
1. Implement payment gateway integrations (KPay, Wave Pay, AYA Pay)
2. Create subscription management
3. Handle course purchases
4. Generate invoices
5. Transaction history API

---

## Testing

Use the provided mock mode to test frontend without backends. When backends are ready:

1. Set `NEXT_PUBLIC_USE_MOCK=false`
2. Configure backend URLs in `.env`
3. Test each endpoint with Postman/Insomnia
4. Verify WebSocket connections
5. Test payment flows in sandbox mode
