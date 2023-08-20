import express, {Router} from "express";
import {createBooking, getAllBookings, getBookingById, getBookingsByUser} from "../controllers/bookingController.js";

const router: Router = express.Router();

router.route("/")
  .post(createBooking)
  .get(getAllBookings)

router.route("/my")
  .get(getBookingsByUser)

router.route("/my/:id").get(getBookingById)

export default router;
