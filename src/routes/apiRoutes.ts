import express, {Router} from 'express';
import indexRoutes from "./indexRoutes.js";
import passengerRoutes from "./passengerRoutes.js";
import bookingRoutes from "./bookingRoutes.js";

const router: Router = express.Router();

router.use("/", indexRoutes);
router.use("/passengers", passengerRoutes);
router.use("/bookings", bookingRoutes);

export default router;