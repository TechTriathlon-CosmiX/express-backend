import express, {Router} from "express";
import {createBooking, getAllBookings, getBookingById, getBookingsByUser} from "../controllers/bookingController.js";

const router: Router = express.Router();

router.route("/")
  .post(createBooking)
  .get(getAllBookings)

router.route("/:id").get(getBookingById)

router.route("/my")
  .get(getBookingsByUser)

export default router;
