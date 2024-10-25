import express from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import config from './app/config';
const app = express();

app.use(
  cors({
    // origin: config.frontend_url,
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// for global error
app.use(globalErrorHandler);

// for not found route
app.use(notFound);

export default app;
