import { Router } from "express";
const router = Router();

import {
  userController
} from "./controllers"

router.use("/api/user", userController);

export default router;