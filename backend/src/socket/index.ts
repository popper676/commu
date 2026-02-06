import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

interface SocketUser {
    id: string;
    username: string;
}

// Store online users
const onlineUsers = new Map<string, string>(); // userId -> socketId

export const initializeSocketHandlers = (io: Server) => {
    console.log('🔌 Socket.io initialized');

    // Authentication middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as SocketUser;
            socket.data.user = decoded;
            next();
        } catch (error) {
            next(new Error('Authentication error: Invalid token'));
        }
    });

    io.on('connection', (socket) => {
        const user = socket.data.user as SocketUser;
        console.log(`✅ User connected: ${user.username} (${socket.id})`);

        // Add user to online users
        onlineUsers.set(user.id, socket.id);

        // Broadcast online status
        io.emit('user:online', { userId: user.id });

        // Join user's personal room
        socket.join(`user:${user.id}`);

        // ==================== CHAT HANDLERS ====================

        // Join channel
        socket.on('channel:join', (channelId: string) => {
            socket.join(`channel:${channelId}`);
            console.log(`User ${user.username} joined channel ${channelId}`);
        });

        // Leave channel
        socket.on('channel:leave', (channelId: string) => {
            socket.leave(`channel:${channelId}`);
            console.log(`User ${user.username} left channel ${channelId}`);
        });

        // Send message (will be handled by message service)
        socket.on('message:send', (data: { channelId: string; content: string }) => {
            // This will be emitted back after saving to database
            io.to(`channel:${data.channelId}`).emit('message:new', {
                ...data,
                userId: user.id,
                username: user.username,
                timestamp: new Date().toISOString(),
            });
        });

        // Typing indicator
        socket.on('typing:start', (channelId: string) => {
            socket.to(`channel:${channelId}`).emit('typing:user', {
                userId: user.id,
                username: user.username,
                channelId,
            });
        });

        socket.on('typing:stop', (channelId: string) => {
            socket.to(`channel:${channelId}`).emit('typing:stop', {
                userId: user.id,
                channelId,
            });
        });

        // Message read receipt
        socket.on('message:read', (data: { messageId: string; channelId: string }) => {
            socket.to(`channel:${data.channelId}`).emit('message:read', {
                messageId: data.messageId,
                userId: user.id,
                readAt: new Date().toISOString(),
            });
        });

        // ==================== NOTIFICATION HANDLERS ====================

        socket.on('notification:send', (data: { targetUserId: string; type: string; content: any }) => {
            const targetSocketId = onlineUsers.get(data.targetUserId);
            if (targetSocketId) {
                io.to(targetSocketId).emit('notification:new', {
                    type: data.type,
                    content: data.content,
                    timestamp: new Date().toISOString(),
                });
            }
        });

        // ==================== DISCONNECT HANDLER ====================

        socket.on('disconnect', () => {
            console.log(`❌ User disconnected: ${user.username} (${socket.id})`);
            onlineUsers.delete(user.id);
            io.emit('user:offline', { userId: user.id });
        });
    });
};

// Helper function to emit to specific user
export const emitToUser = (io: Server, userId: string, event: string, data: any) => {
    io.to(`user:${userId}`).emit(event, data);
};

// Helper function to emit to channel
export const emitToChannel = (io: Server, channelId: string, event: string, data: any) => {
    io.to(`channel:${channelId}`).emit(event, data);
};

export { onlineUsers };
