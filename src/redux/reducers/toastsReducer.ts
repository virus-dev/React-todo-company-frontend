import { types } from '../types'

export interface toastsReducer {
    toasts: any
}

export interface toastsState {
    toasts: string[]
}

const initialState = {
    toasts: [],
}

export const toastsReducer = (state: toastsState = initialState, action: any) => {
    switch (action.type) {
        case types.ADD_TOAST_MESSAGE:
            return {
                ...state,
                toasts: [...state.toasts, action.payload]
            }
        case types.DELETE_TOAST_MESSAGE:
            const newToasts = state.toasts.filter((el: any, i: number) => i !== 0)
            return {
                ...state,
                toasts: newToasts
            }
        default:
            return {...state}
    }
}