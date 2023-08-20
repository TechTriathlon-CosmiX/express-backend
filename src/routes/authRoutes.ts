
import express, {Router} from "express";
import {loginUser, registerUser} from "../controllers/authController.js";


const router: Router = express.Router();

router.route("/register")
    .post(registerUser);

router.route("/login")
  .post(loginUser);

export default router;






