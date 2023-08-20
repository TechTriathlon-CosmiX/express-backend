import express, {Router} from 'express';
import indexRoutes from "./indexRoutes.js";
import authRoutes from "./authRoutes.js";



const router: Router = express.Router();

router.use("/", indexRoutes);
// router.use("/passengers", passengerRoutes);

router.use("/auth", authRoutes);


export default router;