const express = require("express");
const { Router } = express;
const { uploadVideo, upload, getVideo, getAllVideos, deleteVideo } = require("../../controllers/taskFive");

const router = Router();

// Route to POST video with the "upload" middleware
router.post('/upload', upload.single('video'), uploadVideo);
router.get('/:videoName', getVideo)
router.get('/', getAllVideos)
router.delete('/:videoName', deleteVideo)

module.exports = router;
