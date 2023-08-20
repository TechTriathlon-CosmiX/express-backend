import express, {Router} from 'express';
import indexRoutes from "./indexRoutes.js";
import planetRoutes from "./planetRoutes.js";
import spaceportRoutes from "./spaceportRoute.js";

const router: Router = express.Router();

router.use("/", indexRoutes);
router.use("/", planetRoutes);
router.use("/", spaceportRoutes);

export default router;
