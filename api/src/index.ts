import express, {Application, Request, Response} from "express";
import {config} from "dotenv";
config();
import cors from 'cors';
import { dbConnection } from "./config/db/connect";
import taskRouter from "./config/routes/task";
import { AddressInfo } from "net";



const app: Application = express();
app.use(express.json());


// cors declaration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,            // access-control-allow-credentials:true
}));

app.get('/',(req:Request,res:Response)=>res.json({"message":"Hey, this is a Todo App Server","author":"Anish Verma","created_for":"W3Dev Pvt Ltd."}));
app.use('/api/v1',taskRouter);


const server=app.listen(process.env.SERVER_PORT||5000,()=>{
    const { port } = server.address() as AddressInfo;
    console.log('***** Todo Server started at port *****',port);
    dbConnection();
})

