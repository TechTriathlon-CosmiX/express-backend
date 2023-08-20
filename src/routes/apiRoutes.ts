import express, {Router} from 'express';
import indexRoutes from "./indexRoutes.js";
import passengerRoutes from "./passengerRoutes.js";

const router: Router = express.Router();

router.use("/", indexRoutes);
router.use("/passengers", passengerRoutes);

export default router;