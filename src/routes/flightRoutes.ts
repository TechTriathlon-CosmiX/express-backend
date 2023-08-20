import express, { Router } from "express";
import {createFlight, getAllFlights, getFlightById, getFlightsForSearch} from "../controllers/flightController";

const router: Router = express.Router();

router.route("/")
    .post(createFlight)
    .get(getAllFlights)

router.route("/:flightId")
  .get(getFlightById)

router.route("/search")
  .post(getFlightsForSearch)

export default router;
