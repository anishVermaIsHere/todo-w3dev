import { Dispatch, FC, SetStateAction } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Task, TaskAPI } from '../../../services/api';

type TaskFormPropsType={
  setIsForm:Dispatch<SetStateAction<boolean>>;
  isUpdate:boolean;
  setIsUpdate:Dispatch<SetStateAction<boolean>>;
  isEdit:boolean;
  setIsEdit:Dispatch<SetStateAction<boolean>>;
  editValues:FormValues;
}

export interface FormValues {
  title: string;
  description: string;
  tags:string|string[];
  duedate: string;
  status:string;
}

const TaskForm:FC<TaskFormPropsType> = ({
    setIsForm,
    setIsUpdate,
    isUpdate,
    isEdit,
    setIsEdit,
    editValues,
}:TaskFormPropsType) => {

  const initalValues:FormValues={
    title: '',
    description: '',
    tags:[],
    duedate: '',
    status:'Open'
  }

  return (
    <div
      className="fixed bottom-0 left-0 top-0 right-0 flex items-center justify-center z-50 p-5 sm:p-12"
      style={{ background: "rgb(17 16 16 / 44%)" }}
    >
    <div className="mx-auto w-full sm:w-[400px] bg-white shadow-xl rounded-xl p-5">
        <div className="flex justify-between items-center pb-4 mb-4">
            <p className="font-semibold text-gray-700 text-xl">Add Task</p>
            <button
              title="Close form"
              className="bg-gray-700 rounded"
              onClick={()=>{
                setIsForm(false);
                setIsEdit(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#fff"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
        </div>

        <Formik
          initialValues={isEdit?editValues:initalValues}
          onSubmit={async (values:FormValues) => {
            const taskAPI=new TaskAPI();
            if(isEdit){
              const formValues={
                ...values,
                tags:(values.tags as string).split(',')
              }
              const id=formValues.id;
              delete formValues["id"];
              await taskAPI.update(id,formValues);
              setIsUpdate(!isUpdate);

            } else {
              const formValues={
                ...values,
                tags:(values.tags as string).split(',')
              }
              await taskAPI.add(formValues);
              setIsUpdate(!isUpdate);
            }
            setIsForm(false);
            setIsEdit(false);

          }}
        >
          <Form>
          <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <Field
            type="text"
            id="title"
            name="title"
            className="shadow-sm bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <Field
            type="text"
            id="description"
            name="description"
            className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="duedate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Due Date
          </label>
          <Field
            type="date"
            id="duedate"
            name="duedate"
            className="shadow-sm bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
            required
          />
        </div>
        
        <div className="mb-2">
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tags
          </label>
          <Field
            type="text"
            id="tags"
            name="tags"
            className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
            required
          />
        </div>
       
        {isEdit?<button
          type='submit'
          className="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Update
        </button>
        :
        <button
          type='submit'
          className="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Save
        </button>}
            
          </Form>

        </Formik>

      

        
      
    </div>
  </div>


  )
}

export default TaskForm
