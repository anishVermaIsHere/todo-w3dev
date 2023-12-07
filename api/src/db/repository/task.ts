import { Request,Response } from "express";
import { CreateTaskInputType, DeleteTaskType, UpdateTaskInputType } from "../../shared/validation/task.schema";
import { TaskModel } from "../models/task.model";
import { HTTP_CODES } from "../../shared/constants/constant";

const {SERVER_ERROR,SUCCESS,CREATE,RESOURCE_NOT_FOUND}=HTTP_CODES

export const taskManage={
    async get(req:Request,res:Response){
        const doc=await TaskModel.find().sort({createdAt:-1});
        res.status(SUCCESS).json(doc);
    },
    async create(req:Request<{},{},CreateTaskInputType["body"]>,res:Response){
        try {
            const doc=await TaskModel.create(req.body);
            if(doc._id){
                res.status(CREATE).json("Task created successfully");
            } 
        } catch (error:any) {
            return res.json({message:error.message});
        }        
    },
    async delete(taskId:string,res:Response){
        try {
            const isDeleted=await TaskModel.deleteOne({ _id: taskId });
            if(isDeleted.acknowledged){
                res.status(SUCCESS).json("Task deleted successfully");
            }
        } catch (error:any) {
            return res.json({message:error.message});
        }

    },
    async update(taskId:string,data:UpdateTaskInputType,res:Response){
        try {
            const updatedTask=await TaskModel.findByIdAndUpdate({ _id: taskId }, data,{new:true});
        if(updatedTask){
            res.status(SUCCESS).json(updatedTask);
        } else {
            res.status(RESOURCE_NOT_FOUND).json({message:'Task not found'});
        }
        } catch (error:any) {
            return res.json({message:error.message});
        }
        
    },
    async find(taskId:string,res:Response){
        try {
            const doc=await TaskModel.findById({_id:taskId});
            return res.status(SUCCESS).json(doc);
        } catch (error:any) {
            return res.json({message:error.message});
        }
    },
    async updateStatus(taskId:string,res:Response){
        try {
            const doc=await TaskModel.findByIdAndUpdate({ _id: taskId }, {status:"Completed"},{new:true});
            if(doc){
                return res.status(SUCCESS).json(doc);
            }
        } catch (error:any) {
            return res.json({message:error.message});
        }
    }
}