import express, { Router } from "express";
import { getAllSpaceports, getSpaceportById, updateSpaceport, createSpaceport  } from "../controllers/spaceportController.js";

const router: Router = express.Router();

router.route("/createspaceport/")
    .post(createSpaceport)

router.route("/allspaceports")
    .get(getAllSpaceports)

router.route("/spaceport/:spaceportId")
    .get(getSpaceportById)
    .put(updateSpaceport);

export default router;