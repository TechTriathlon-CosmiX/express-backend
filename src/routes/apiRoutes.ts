import express, {Router} from 'express';
import indexRoutes from "./indexRoutes.js";

const router: Router = express.Router();

router.use("/", indexRoutes);

export default router;
