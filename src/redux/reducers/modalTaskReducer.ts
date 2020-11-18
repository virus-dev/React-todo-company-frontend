import { types } from '../types'

export interface modalTaskReducer {
    modalTask: {
        users: any,
        isLoaded: boolean
    }
}

export interface modalTaskState {
    users: any,
    isLoaded: boolean
}

const initialState = {
    users: [],
    isLoaded: true
}

export const modalTaskReducer = (state: modalTaskState = initialState, action: any) => {
    switch (action.type) {
        case types.GET_USERS_FOR_MODAL_TASK:
            return {
                users: [],
                isLoaded: false
            }
        case types.SET_USERS_FOR_MODAL_TASK:
            return {
                users: action.payload,
                isLoaded: true
            }
        default:
            return {...state}
    }
}