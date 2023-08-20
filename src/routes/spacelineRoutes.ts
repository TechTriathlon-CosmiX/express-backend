
import express, {Router} from "express";
import { createSpaceline,getAllSpacelines,getSpacelineById,deleteSpaceline } from "../controllers/spacelineController.js";


const router: Router = express.Router();


router.route("/")
    .get(getAllSpacelines)
    .post(createSpaceline);

router.route("/:spaceline_Id")
    .get(getSpacelineById)
    .delete(deleteSpaceline)
    

export default router;





