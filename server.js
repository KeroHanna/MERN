import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

// routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// static files for frontend
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(cookieParser());
app.use(express.json());

// api routes
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

// fallback to index.html for client-side routing (e.g., React Router)
app.get('*', (req, res) => {
  if (!req.originalUrl.startsWith('/api')) {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
  } else {
    res.status(404).json({ msg: 'API route not found' });
  }
});

app.use(errorHandlerMiddleware);

// connect DB and start server
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`✅ Server running on PORT ${port}`);
  });
} catch (error) {
  console.error('❌ Failed to connect to DB:', error);
  process.exit(1);
}
