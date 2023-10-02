const Video = require("../models/video");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// MULTER MIDDLEWARE FOR FILE UPLOADS
const upload = multer({ storage: storage });

// UPLOAD CONTROLLER FUNCTION
const uploadVideo = async (req, res) => {
    try {
      const filename = req.file ? req.file.filename : undefined;
  
      if (filename === undefined) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      const video = new Video({ filename });
  
      await video.save();
  
      if (!video) {
        return res.status(400).json({ error: "Error saving video" });
      }
  
      const uploadsFolder = 'uploads';
      if(!fs.existsSync(uploadsFolder)){
        fs.mkdirSync(uploadsFolder)
      }

      res.status(200).json({ message: "Video record uploaded successfully", video });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
//HANDLING CHUNKS

const uploadChunks = async (req, res) => {
  try {
  const chunk = req.file.buffer; 

  const videoId = req.body.videoId;
  console.log("VIDEOID=>", videoId)

  const videoFilePath = `uploads/${videoId}.mp4`;

   // Check if the video file exists; if not, create it
   if (!fs.existsSync(videoFilePath)) {
    // Create a new file with the video ID as the filename
    fs.writeFileSync(videoFilePath, chunk);
  } else {
    // If the file already exists, append the chunk to it
    fs.appendFileSync(videoFilePath, chunk);
  }

  //
     // Send a response to acknowledge the receipt of the chunk
     res.status(200).json({ message: 'Chunk received and processed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
  
// VIDEO RETRIEVAL CONTROLLER FUNCTION
const getVideo = (req, res) => {
  const videoName = req.params.videoName;
  const filePath = path.join("uploads", videoName);
  console.log("FILEPATH=>", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Video file not found" });
  }

  res.setHeader("Content-Type", "video/mp4");

  //TO OPTIMIZE THE STREAMING SIZE, I INCREASE THE CHUNK SIZE
  const fileStream = fs.createReadStream(filePath, {
    highWaterMark: 64 * 1024,
  }); // 64KB chunk size

  fileStream.on("error", (error) => {
    console.error("Error streaming video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  });

  fileStream.pipe(res);

  fileStream.on("close", () => {
    console.log("Video stream closed");
  });
};

//GET ALL VIDEOS CONTROLLER FUNCTION
const getAllVideos = async (req, res) => {
  try {
    
    // const baseVideoUrl = "http://localhost:8000/api/";
    const baseVideoUrl = "https://hng-query-api.onrender.com/api/";

    const serverVideos = [];

    const directoryPath = path.join("uploads");
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      console.log("FILEPATH=>", filePath);
      const fileStats = fs.statSync(filePath);

      const encodedFilename = encodeURIComponent(file);
      console.log("ENCODED FILENAME=>", encodedFilename)
      
      // ADDED THIS ENCODING TO MAKE SURE THE FILENAME IS ENCODED AS A VALID URL.
      // THIS EXTRA CHECK MAKES SURE THE FILE IS A VIDEO FILE NOT A FOLDER
      if (fileStats.isFile()) {
        const videoUrl = `${baseVideoUrl}/${encodedFilename}`;
          // TO CALCULATE THE APPROPRIATE FILESIZE AND ADD THE PREFIX (KB or MB)
          let fileSize;
          if (fileStats.size >= 1024 * 1024) {
            fileSize = `${(fileStats.size / (1024 * 1024)).toFixed(2)} MB`;
          } else {
            fileSize = `${(fileStats.size / 1024).toFixed(2)} KB`;
          }
  
        serverVideos.push({
          filename: file,
          url: videoUrl,
          size: fileSize,
          createdAt: fileStats.birthtime,
        });
      }
    }

    if (serverVideos.length === 0) {
      return res.status(404).json({ error: "No videos found" });
    }

    res.json(serverVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//DELETE VIDEO CONTROLLER FUNCTION
const deleteVideo = async (req, res) => {
  try {
    const videoName = req.params.videoName;
    const filePath = path.join("uploads", videoName);
    console.log("FILEPATH=>", filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Video file not found" });
    }

    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Video file deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { upload, uploadVideo,uploadChunks,  getVideo, getAllVideos, deleteVideo };
