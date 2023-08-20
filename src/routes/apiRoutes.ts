import express, {Router} from 'express';
import indexRoutes from "./indexRoutes.js";
import authRoutes from "./authRoutes.js";
import {verifyAuthToken} from "../middleware/authTokenChecker";
import bookingRoutes from "./bookingRoutes";
import flightRoutes from "./flightRoutes";



const router: Router = express.Router();

router.use("/", indexRoutes);
// router.use("/passengers", passengerRoutes);
router.use("/auth", authRoutes);
router.use("/flights", verifyAuthToken, flightRoutes);
router.use("/bookings", verifyAuthToken, bookingRoutes);


export default router;
