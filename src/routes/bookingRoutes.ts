import express, { Router } from "express";
import { createBooking } from "../controllers/bookingController.js";

const router: Router = express.Router();

router.route("/")
    .post(createBooking);
    // .get(getAllPassengers)

// router.route("/:user_id")
//     .get(getPassengerById)
//     .delete(deletePassenger)
//     .put(updatePassenger);

export default router;
