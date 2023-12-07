import { taskManage } from "../db/repository";
import { Request,Response } from "express";
import { CreateTaskInputType, UpdateTaskInputType } from "../shared/validation/task.schema";

export const taskController={
    async get(req:Request,res:Response){
        try {
            return await taskManage.get(req,res);
        } catch (error:any) {
            return res.json({message:error.message});
        }
    },
    async add(req:Request<{},{},CreateTaskInputType["body"]>,res:Response){
        try {
            return await taskManage.create(req,res);
        } catch (error:any) {
            return res.json({message:error.message});
        }
    },
    async remove(req:Request<{id:string}>,res:Response){
        try {
            const taskId=req.params.id;
            return await taskManage.delete(taskId,res);
        } catch (error:any) {
            return res.json({message:error.message});
        }
        
    },
    async update(req:Request<UpdateTaskInputType["params"]>,res:Response){
        const taskId=req.params.id;
        const data=req.body;
        return await taskManage.update(taskId,data,res);
    },
     async getTask(req:Request<{id:string}>,res:Response){
        const taskId=req.params.id;
        return await taskManage.find(taskId,res);
     },
     async complete(req:Request<{id:string}>,res:Response){
        const taskId=req.params.id;
        return await taskManage.updateStatus(taskId,res);
     }
    
}
