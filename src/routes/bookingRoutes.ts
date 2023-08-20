import express, { Router } from "express";
import { createBooking, getBookingById, getUserBookingsByUserId } from "../controllers/bookingController.js";

const router: Router = express.Router();

router.route("/:booking_id")
    .get(getBookingById);

router.route("user/:user_id")
    .post(createBooking)
    .get(getUserBookingsByUserId);
    
export default router;
