import express, { Router } from "express";
import { getAllPassengers, createPassenger, deletePassenger } from "../controllers/passengerController.js";

const router: Router = express.Router();

router.route("/").get(getAllPassengers);
router.route("/").post(createPassenger);
router.route("/").delete(deletePassenger);

export default router;
