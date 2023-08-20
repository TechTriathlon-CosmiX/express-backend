
import express, {Router} from "express";
import { getallspaceships,getspaceshipbyId,createSpaceship,deletespaceship } from "../controllers/spaceshipController.js";


const router: Router = express.Router();


router.route("/")
    .get(getallspaceships)
    .post(createSpaceship);

router.route("/:spaceline_Id")
    .get(getspaceshipbyId)
    .delete(deletespaceship)
    

export default router;





