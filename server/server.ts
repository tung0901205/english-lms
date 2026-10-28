import { app } from './app';
import { v2 as cloudinary } from 'cloudinary';
import connectDB from './utils/db';
import http from 'http';
require('dotenv').config();

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const server = http.createServer(app);

// create server
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});