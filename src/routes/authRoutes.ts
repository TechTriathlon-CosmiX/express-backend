
import express, {Router} from "express";
import { loginPassenger,getAllPassengers, getPassengerById, createPassenger, deletePassenger, updatePassenger } from "../controllers/passengerController.js";


const router: Router = express.Router();



router.route("/register")
    .post(loginPassenger)
   

export default router;






