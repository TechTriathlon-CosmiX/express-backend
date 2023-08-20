import express, {Router} from 'express';
import indexRoutes from "./indexRoutes.js";
import authRoutes from "./authRoutes.js";
import passengerRoutes from "./passengerRoutes.js";
import spacelineRoutes from "./spacelineRoutes.js";
import spaceshipRoutes from "./spaceshipRoutes.js";



const router: Router = express.Router();

router.use("/", indexRoutes);
router.use("/passengers", passengerRoutes);
router.use("/spaceline", spacelineRoutes);
router.use("/spaceship", spacelineRoutes);


router.use("/auth", authRoutes);


export default router;