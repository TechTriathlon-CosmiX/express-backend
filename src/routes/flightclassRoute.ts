import express, { Router } from "express";
import { getAllFlightClasses, getFlightClassById, updateFlightClass, createFlightClass  } from "../controllers/flightclassController.js";

const router: Router = express.Router();

router.route("/createflightclass/")
    .post(createFlightClass)

router.route("/allflightclass")
    .get(getAllFlightClasses)

router.route("/flightclass/:flightclassId")
    .get(getFlightClassById)
    .put(updateFlightClass);

export default router;