import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ApiError, HttpStatus } from '../utils/response';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure local disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Determine subfolder based on file type
        let subfolder = 'others';

        if (file.mimetype.startsWith('image/')) {
            subfolder = 'images';
        } else if (file.mimetype.startsWith('video/')) {
            subfolder = 'videos';
        } else if (file.mimetype.startsWith('audio/')) {
            subfolder = 'audio';
        } else if (file.mimetype === 'application/pdf' ||
            file.mimetype.includes('document') ||
            file.mimetype.includes('sheet') ||
            file.mimetype.includes('presentation')) {
            subfolder = 'documents';
        }

        const destPath = path.join(uploadsDir, subfolder);
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
        }

        cb(null, destPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        cb(null, uniqueSuffix + '-' + sanitizedName);
    },
});

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = [
        // Images
        'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
        // Videos
        'video/mp4', 'video/webm', 'video/quick time',
        // Audio
        'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4',
        // Documents
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
        'text/plain'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ApiError(HttpStatus.BAD_REQUEST, `File type ${file.mimetype} is not allowed`) as any);
    }
};

// Limits
const limits = {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
};

// Export multer instance
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits,
});

export default upload;
