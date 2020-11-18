import { types } from '../types'

interface addTaskParams {
    task: {
        title: string,
        description: string,
        endingDate: string,
        creationDate: string,
        dateOfUpdate: string,
        priority: string,
        status: string,
        creator: number,
        responsible: number | undefined,
    },
    token: string
}
export const addTask = (action: addTaskParams) => ({
    type: types.ADD_TASK,
    payload: action
})

export const setTasks = (action: any) => ({
    type: types.SET_TASKS,
    payload: action
})

export const getAllTasks = (token: string) => ({
    type: types.GET_ALL_TASKS,
    payload: token
})

export const getTasksByDate = (action: any) => ({
    type: types.GET_TASK_USER_BY_DATE,
    payload: action
})

export const getAllTasksUser = (action: any) => ({
    type: types.GET_ALL_TASKS_USER,
    payload: action
})

export const updateTasksFromBoss = (action: any) => ({
    type: types.UPDATE_TASK_FROM_BOSS,
    payload: action
})

export const updateTasksFromResponsive = (action: any) => ({
    type: types.UPDATE_TASK_FROM_RESPONSIVE,
    payload: action
})