import axios from "axios";

export interface Task {
    title: string;
    description: string;
    status: string;
    duedate: string;
    tags:string[];
    _id:string;
}

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

export class TaskAPI {
    url=import.meta.env.VITE_BASE_URL+'/tasks';
    async getAll() {
       return await axios.get(this.url);        
    }
    async add(task:Omit<Task,"_id">){
        return axios.post(`${this.url}/new`,task);
    }
    async delete(id:string){
        return axios.delete(`${this.url}/delete/${id}`);
    }
    async update(id:string,data:Task){
        return await axios.put(`${this.url}/edit/${id}`,data);
    }
    async findTask(id:string){
        return await axios.get(`${this.url}/${id}`);
    }
    async completeTask(id:string){
        return await axios.post(`${this.url}/complete/${id}`);
    }
}


