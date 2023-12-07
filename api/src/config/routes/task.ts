import { Router } from "express";
import { taskController } from "../../controller";

const taskRouter=Router();

taskRouter.get('/tasks',taskController.get);
taskRouter.post('/tasks/new',taskController.add);
taskRouter.put('/tasks/edit/:id',taskController.update);
taskRouter.delete('/tasks/delete/:id',taskController.remove);
taskRouter.get('/tasks/:id',taskController.getTask);
taskRouter.post('/tasks/complete/:id',taskController.complete)


export default taskRouter;