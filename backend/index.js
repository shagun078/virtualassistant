import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running `);
});