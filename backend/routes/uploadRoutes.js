const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const { protect, admin } = require('../middleware/authMiddleware');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test endpoint (remove after debugging)
router.post('/test', protect, admin, (req, res) => {
  res.json({
    message: 'Upload endpoint reached',
    hasImage: !!req.body.image,
    imageLength: req.body.image?.length || 0,
    imagePreview: req.body.image?.substring(0, 50) + '...'
  });
});

// Upload base64 image
router.post('/', protect, admin, async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'No image provided' });
    }

    // Validate base64 format
    if (!image.startsWith('data:image/')) {
      return res.status(400).json({ message: 'Invalid image format. Must be base64 data URL' });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: 'tanz',
      resource_type: 'auto'
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    res.status(500).json({
      message: err.message || 'Upload failed',
      details: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
});

module.exports = router;