import {Document} from "mongoose";

export interface TaskDBModel extends Document{
    title: string;
    description: string;
    duedate:Date;
    tags:string[];
    status:string;
}
