import { Router } from "express";
import taskController from "../controllers/task.controller";

const taskRoutes = Router();
taskRoutes.post("/task", taskController.add);
taskRoutes.post("/task/list", taskController.getList);
taskRoutes.get("/task/:taskId", taskController.find);
taskRoutes.put("/task/:taskId", taskController.update);
taskRoutes.get("/task/:userId/metrics", taskController.getMetrics);
export { taskRoutes };
