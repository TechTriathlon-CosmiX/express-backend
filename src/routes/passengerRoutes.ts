import express, { Router } from "express";
import { getAllPassengers, getPassengerById, createPassenger, deletePassenger, updatePassenger } from "../controllers/passengerController.js";

const router: Router = express.Router();

router.route("/")
    .get(getAllPassengers)
    .post(createPassenger);

router.route("/:user_id")
    .get(getPassengerById)
    .delete(deletePassenger)
    .put(updatePassenger);

export default router;
