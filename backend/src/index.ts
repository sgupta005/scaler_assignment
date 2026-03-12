import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './middlewares/logger.js';
import globalErrorHandler from './middlewares/global-error-handler.js';
import categoryRouter from './routes/category.routes.js';
import productRouter from './routes/product.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use(logger);

app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
