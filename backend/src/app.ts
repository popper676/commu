import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Middleware
const app: Application = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 100 requests per window
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

import authRoutes from './routes/auth.routes';
import fileRoutes from './routes/file.routes';
import feedRoutes from './routes/feed.routes';
import communityRoutes from './routes/community.routes';
import chatRoutes from './routes/chat.routes';
import challengeRoutes from './routes/challenge.routes';
import dmRoutes from './routes/dm.routes';
import creatorRoutes from './routes/creator.routes';

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/dm', dmRoutes);
app.use('/api/creators', creatorRoutes);

app.get('/api', (req: Request, res: Response) => {
    res.json({
        message: 'Community Myanmar People API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            communities: '/api/communities',
            feed: '/api/feed',
            chat: '/api/chat',
            files: '/api/files',
            challenges: '/api/challenges',
            dm: '/api/dm',
            creators: '/api/creators',
        },
    });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.path}`,
    });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});

export default app;
