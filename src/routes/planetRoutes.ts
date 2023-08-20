import express, { Router } from "express";
import { getAllPlanets, getPlanetById, updatePlanet, createPlanet  } from "../controllers/planetController.js";

const router: Router = express.Router();

router.route("/createplanet/")
    .post(createPlanet)

router.route("/allplanets")
    .get(getAllPlanets)

router.route("/planet/:planetId")
    .get(getPlanetById)
    .put(updatePlanet);

export default router;