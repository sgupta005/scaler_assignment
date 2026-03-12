import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './middlewares/logger.js';
import globalErrorHandler from './middlewares/global-error-handler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use(logger);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
