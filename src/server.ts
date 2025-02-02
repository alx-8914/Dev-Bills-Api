import dotenv from "dotenv";
import cors from 'cors'
import express, { json, ErrorRequestHandler } from "express";

import { setupMongo } from "./database";
import { errorHandler } from "./middleware/error-handler.middleware";
import { routes } from "./routes";

dotenv.config();

setupMongo().then(() => {
  const app = express();

  app.use(cors({ origin: [
    'http://localhost:5173', 
    'https://controles-financeiros-devbills.netlify.app'
  ], credentials: true }));
  app.use(json());
  app.use(routes);

  app.use(errorHandler as unknown as ErrorRequestHandler);

  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () =>
    console.log(`😎🚀💻 Server is running at port ${PORT}!`)
  );
});
