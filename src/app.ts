import express, {Express} from 'express';
import logger from 'morgan';
import cors from "cors";
import 'dotenv/config'

// routes
import apiRouter from "./routes/apiRoutes.js";

const app: Express = express();
const PORT = process.env.PORT || 3001;

// setup middleware for logging, parsing, and cors
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api", apiRouter);

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
