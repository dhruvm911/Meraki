import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js'; // Adjust the path to your Cloudinary config file

const router = express.Router();

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'media', // Folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
  },
});

const upload = multer({ storage });

// Route for image upload
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      url: req.file.path, // Cloudinary URL
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
});

export default router;
