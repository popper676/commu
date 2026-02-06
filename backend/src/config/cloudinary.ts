import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Validate configuration
export const validateCloudinaryConfig = (): boolean => {
    const { cloud_name, api_key, api_secret } = cloudinary.config();

    if (!cloud_name || !api_key || !api_secret) {
        console.warn('⚠️  Cloudinary credentials are missing. File uploads will not work.');
        return false;
    }

    console.log('✅ Cloudinary configured successfully');
    return true;
};

export default cloudinary;
