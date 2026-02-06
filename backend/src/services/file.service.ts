import prisma from '../config/database';
import { FileType } from '@prisma/client';

export class FileService {
    /**
     * Save file metadata to database
     */
    async saveFileMetadata(file: Express.Multer.File, userId: string, messageId?: string, postId?: string) {
        let type: FileType = 'DOCUMENT';

        if (file.mimetype.startsWith('image/')) {
            type = 'IMAGE';
        } else if (file.mimetype.startsWith('video/')) {
            type = 'VIDEO';
        } else if (file.mimetype.startsWith('audio/')) {
            type = 'AUDIO';
        }

        /* 
          Multer-Cloudinary adds 'path' and 'filename' (public_id) properties to the file object.
          Type assertion helps here since standard Express.Multer.File doesn't have them explicitly typed for Cloudinary.
        */
        const fileData = file as any;

        return prisma.file.create({
            data: {
                filename: fileData.filename || file.filename, // Cloudinary uses filename as public_id
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                url: fileData.path || file.path, // Cloudinary URL
                type: type,
                publicId: fileData.filename || file.filename,
                userId: userId,
                messageId: messageId,
                postId: postId,
            },
        });
    }

    /**
     * Delete file
     */
    async deleteFile(fileId: string, userId: string) {
        const file = await prisma.file.findUnique({
            where: { id: fileId },
        });

        if (!file) {
            throw new Error('File not found');
        }

        if (file.userId !== userId) {
            throw new Error('Unauthorized');
        }

        // Note: We should also delete from Cloudinary here using the SDK
        // await cloudinary.uploader.destroy(file.publicId);

        return prisma.file.delete({
            where: { id: fileId },
        });
    }
}

export default new FileService();
