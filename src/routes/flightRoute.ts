import express, { Router } from "express";
import { getAllFlights, getFlightById, updateFlight, createFlight  } from "../controllers/flightController.js";

const router: Router = express.Router();

router.route("/createflight/")
    .post(createFlight)

router.route("/allflights")
    .get(getAllFlights)

router.route("/flight/:flightId")
    .get(getFlightById)
    .put(updateFlight);

export default router;