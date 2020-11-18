import { types } from '../types'

export const getUsersForModalTask = (token: string) => ({
    type: types.GET_USERS_FOR_MODAL_TASK,
    payload: token
})

export const setUsersForModalTask = (users: any) => ({
    type: types.SET_USERS_FOR_MODAL_TASK,
    payload: users
})