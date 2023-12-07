import { FC, useId } from 'react';
import { Task} from '../../services/api'
import card from '../components/Card.module.css';
import Tag from './Tag';

type CardProps={
    task:Task;
   deleteTask:(id:string)=>Promise<void>;
   editTask:(id:string)=>Promise<void>;
   completeTask:(id:string)=>Promise<void>;
}



const Card:FC<CardProps> = ({task,deleteTask,editTask,completeTask}:CardProps) => {
    const uid=useId();
    const commonDateFormat=task.duedate.split('T')[0];
    
  return (
    <>
    <div className={card.card}>
        <div className={card.cardHead}>
            <p className='truncate'>{task.title}</p>
            <button aria-label='complete task' title='complete task' className={`${card.checkMark}`} onClick={()=>completeTask(task._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            
        </div>
        
        <div className={card.cardBody}>
             <p className='text-gray-500 pb-3'>{task.description}</p>
             <div className='flex flex-wrap gap-1 py-2'>
                {task.tags.map((tag,index)=> <Tag tag={tag} key={uid+index}/>)}
             </div>
        </div>
        <div className={card.cardFooter}>
             <p className={`${task.duedate&&task.status=='Open'?'text-red-400':'text-gray-400'} text-sm`}>Due on: {commonDateFormat}</p>
             <ul className={card.taskActionList}>                
                {task.status=='Open'?<button aria-label="edit-task" onClick={()=>editTask(task._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </button>:''}
                <button aria-label="delete-task" onClick={()=>deleteTask(task._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </ul>
        </div>
    </div>
    </>
  )
}

export default Card