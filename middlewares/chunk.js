const multer = require('multer');

//MEMORY STORAGE FOR CHUNKS
const storage = multer.memoryStorage(); // Store chunks in memory

const upload = multer({ storage });

const handleChunks = upload.single('chunk'); 

module.exports = { handleChunks };
