declare module 'multer-storage-cloudinary' {
    import { v2 as cloudinary } from 'cloudinary';
    import { StorageEngine } from 'multer';

    export class CloudinaryStorage implements StorageEngine {
        constructor(options: any);
        _handleFile(req: any, file: any, callback: any): void;
        _removeFile(req: any, file: any, callback: any): void;
    }
}
