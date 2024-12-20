import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'media', // Optional: specify a folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Adjust formats as needed
  },
});

const upload = multer({ storage });

export default upload;
