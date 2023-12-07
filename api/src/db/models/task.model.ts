import { Schema,model, SchemaTypes } from "mongoose";
import { TaskDBModel } from "./interface";

export const taskStatus=['Open','Due','Done'];

const taskSchema = new Schema<TaskDBModel>(
  {
    title: { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, required: true },
    duedate:{type:SchemaTypes.Date, required:true},
    tags:{type:[SchemaTypes.String]},
    status:{type:SchemaTypes.String, enum:taskStatus, default:'Open'},
  },
  { timestamps: true }
);



export const TaskModel = model("Task", taskSchema);
