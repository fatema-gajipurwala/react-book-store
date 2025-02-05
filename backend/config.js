import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://5Vi0zTnVsxVgnXVS:5Vi0zTnVsxVgnXVS@cluster0.lj5e9.mongodb.net/book_store?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  accessKeyId: process.env.accessKeyId || 'AKIAJHDSE73P3D5AD4GQ',
  secretAccessKey: process.env.secretAccessKey || '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',
};
