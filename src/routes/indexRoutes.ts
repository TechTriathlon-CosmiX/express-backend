import express, {Router} from "express";
import {index} from "../controllers/indexController.js";

const router: Router = express.Router();

router.route("/").get(index);

export default router;
