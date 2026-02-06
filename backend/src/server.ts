import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initializeSocketHandlers } from './socket';

const PORT = process.env.PORT || 8000;

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    },
});

// Initialize socket handlers
initializeSocketHandlers(io);

// Make io accessible in routes
app.set('io', io);

// Start server
httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
    console.log(`🔌 Socket.io: ws://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    httpServer.close(() => {
        console.log('HTTP server closed');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    httpServer.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});
