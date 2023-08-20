
import express, {Router} from "express";
import { registerPassenger,loginPassenger,getAllPassengers, getPassengerById, createPassenger, deletePassenger, updatePassenger } from "../controllers/passengerController.js";


const router: Router = express.Router();



router.route("/register")
    .post(registerPassenger)

    router.route("/login")
    .post(loginPassenger)

export default router;






