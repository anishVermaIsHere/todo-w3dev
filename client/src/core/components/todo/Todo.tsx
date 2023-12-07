import { FC, useState, useEffect } from "react";
import { TaskAPI, Task } from "../../../services/api";
import Card from "../Card";
import Tab from "../tabs/Tab";
import TaskForm, { FormValues } from "./TaskForm";


const Todo: FC = () => {
  const [tasks, setTasks] = useState<Omit<Task[],"created_at">>([]);
  const [loading, setLoading] = useState(false);
  const [isUpdate,setIsUpdate]=useState(false);
  const [isEdit,setIsEdit]=useState(false);
  type TaskID ={
    id:string;
  }
  const [editValues,setEditValues]=useState<FormValues & TaskID>({
    id:'',
    title: '',
    description: '',
    tags:[],
    duedate: '',
    status:'Open'
  });

  const [selectTab,setSelectTab]=useState(0);
  const [isForm,setIsForm]=useState(false);

  const getAllTasks = async() => {
    const taskAPI = new TaskAPI();
    const response = await taskAPI.getAll();
    if(selectTab==0){
      setTasks(response.data.filter((task:Task)=>task.status=="Open"));
    } else {
      setTasks(response.data.filter((task:Task)=>task.status=="Completed"));
    }
    setLoading(false);
  };
  
  const deleteTask=async(id:string):Promise<void>=>{
    const taskAPI=new TaskAPI();
    const res=await taskAPI.delete(id);
    setIsUpdate(!isUpdate);
  }

  const editTask=async(id:string):Promise<void>=>{
    const taskAPI=new TaskAPI();
    const res=await taskAPI.findTask(id);
    const data={
      id:id,
      title: res.data.title,
      description: res.data.description,
      tags:res.data.tags,
      duedate: res.data.duedate.split('T')[0],
      status:res.data.status
    }
    setEditValues(data);
    setIsEdit(true);
 }


 const completeTask=async(id:string):Promise<void>=>{
  const taskAPI=new TaskAPI();
  const res=await taskAPI.completeTask(id);
  setIsUpdate(!isUpdate);
 }

  useEffect(() => {
    try {
      setLoading(true);
      getAllTasks();
    } catch (error: unknown) {
      alert("Error occured:" + error.response.data.message);
    }
    return()=>{
      setLoading(false);
      setTasks([]);
    }
  }, [isUpdate,selectTab]);

  // useEffect(()=>{
  //   getAllTasks();
  //   if(selectTab==0){
  //     setTasks(tasks.filter(task=>task.status=="Open"));
  //   } else {
  //     // getAllTasks();
  //     setTasks(tasks.filter(task=>task.status=="Completed"));
  //   }
  //   return()=>setTasks([]);
  // },[selectTab])

  return (
    <section className="container mx-auto w-full px-3 py-2 mt-5">
      <div className="flex gap-2 px-2 mb-5">
        <button className="flex items-center text-sm text-white bg-gray-700 px-2 py-1 rounded" onClick={()=>setIsForm(!isForm)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add
        </button>
        <button className="flex items-center text-sm text-white bg-gray-700 px-2 py-1 rounded" onClick={()=>alert('Not implemented')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

            Clear all
          </button>
      </div>

      {isEdit||isForm?
      <TaskForm 
        setIsForm={setIsForm} 
        setIsUpdate={setIsUpdate} 
        isUpdate={isUpdate}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        editValues={editValues}
        />:""}
      
      <div className="px-3">
        <div>
          <Tab selectTab={selectTab} setSelectTab={setSelectTab}/>
          <div id="default-tab-content">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
              <div className="flex items-center justify-start">
                <h5 className="px-2 text-gray-500 w-full">
                  Total {tasks&&tasks.length}
                </h5>            
              </div>
            
              <div className="relative flex w-full md:w-1/3 flex-wrap items-end">
                <input
                  type="search"
                  className="relative m-0 block w-[1px] flex-auto rounded border border-solid bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-gray-500 focus:text-neutral-700 focus:shadow-gray-500 focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </div>

            {loading? (
                  <div className="flex items-center justify-center min-h-[80vh] text-lg animate-pulse text-center">Loading...</div>
                ) : 
                (
                  tasks.length?<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 rounded-md">
                    {tasks?.map((task: Task) => (
                      <Card 
                        key={task.id} 
                        task={task} 
                        deleteTask={deleteTask}
                        editTask={editTask}
                        completeTask={completeTask}
                      />
                    ))
                    }
                  </div>
                  :
                  <div className="flex items-center justify-center min-h-[80vh] text-lg text-gray-500 text-center">No data</div>
              )}
              
          </div>
        </div>

       
      </div>

     
    </section>
  );
};

export default Todo;
