
import express, {Router} from "express";
import { registerPassenger,getAllPassengers, getPassengerById, createPassenger, deletePassenger, updatePassenger } from "../controllers/passengerController.js";


const router: Router = express.Router();



router.route("/register")
    .post(registerPassenger)
   

export default router;






