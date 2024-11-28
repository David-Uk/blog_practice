const { CloudinaryStorage } = require('@fluidjs/multer-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const { CLOUD_NAME, CLOUD_SECRET, CLOUD_API } = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API,
    api_secret: CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: '/uploads',
        allowed_formats: ['jpeg', 'jpg', 'png']
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}); // Allow a maximum of 10 images

module.exports = upload;