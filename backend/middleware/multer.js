import multer from 'multer';

// Set up multer storage
const upload = multer({ dest: 'uploads/' }); // Temporary directory for uploaded files

export default upload;
