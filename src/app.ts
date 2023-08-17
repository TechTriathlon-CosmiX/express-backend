import express, {Express} from 'express';
import logger from 'morgan';
import cors from "cors";
import 'dotenv/config';
import "reflect-metadata";

// routes
import apiRouter from "./routes/apiRoutes.js";
import {AppDataSource} from "./data-source.js";

const app: Express = express();
const PORT = process.env.PORT || 3001;

// setup middleware for logging, parsing, and cors
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api", apiRouter);

// initialize database connection
AppDataSource.initialize().then(async (): Promise<void> => {
  console.log("Database connection initialized successfully");

  // listen for requests
  app.listen(PORT, (): void => {
    console.log(`Server started on port ${PORT}`);
  });

}).catch((error: Error) => console.log(error))


export default app;
