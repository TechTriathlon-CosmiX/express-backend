import express, {Router} from 'express';
import indexRoutes from "./indexRoutes.js";
import planetRoutes from "./planetRoutes.js";
import spaceportRoutes from "./spaceportRoute.js";
import flightRoutes from "./flightRoute.js";
import flightclassRoutes from "./flightclassRoute.js";

const router: Router = express.Router();

router.use("/", indexRoutes);
router.use("/", planetRoutes);
router.use("/", spaceportRoutes);
router.use("/", flightRoutes);
router.use("/", flightclassRoutes);

export default router;
