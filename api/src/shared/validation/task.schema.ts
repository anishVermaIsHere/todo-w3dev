import {object,string,date, TypeOf} from 'zod';

const taskSchema={
    body:object({
        title:string({
            required_error:"Task title is required"
        }),
        description:string({
            required_error:"Task description is required"
        }),
        duedate:date({
            required_error:"Due date is required"
        }),
        tags:string().array()
    })
};

const params={
    params:object({
        id:string({
            required_error:"Task id is required"
        })
    })
};

const createTaskSchema=object({
    ...taskSchema,
});

const updateTaskSchema=object({
    ...taskSchema,
    ...params
});

const deleteTaskSchema=object({
    ...params
});

const getTaskSchema=object({
    ...params
});


export type CreateTaskInputType=TypeOf<typeof createTaskSchema>;
export type UpdateTaskInputType=TypeOf<typeof updateTaskSchema>;
export type GetATaskType=TypeOf<typeof getTaskSchema>;
export type DeleteTaskType=TypeOf<typeof deleteTaskSchema>;
