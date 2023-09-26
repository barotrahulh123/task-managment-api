import { Router } from "express";
import userController from "../controllers/user.controller";

const userRoutes = Router();
userRoutes.post("/user", userController.add);
userRoutes.get("/user", userController.get);
userRoutes.get("/user/:id", userController.find);

export { userRoutes };
