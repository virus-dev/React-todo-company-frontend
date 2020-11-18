import { types } from '../types'

export interface modalReducer {
    modal: any
}

export interface modalState {
    isOpen: boolean,
    title: string,
    cross: boolean,
    component: any
}

const initialState = {
    isOpen: false,
    title: '',
    cross: true,
    component: null
}

export const modalReducer = (state: modalState = initialState, action: any) => {
    switch (action.type) {
        case types.MODAL_SET_TITLE_CROSS_COMPONENT:
            return {
                isOpen: true,
                title: action.payload.title,
                cross: action.payload.cross,
                component: action.payload.component
            }
        case types.CLOSE_MODAL:
            return {
                isOpen: false,
                title: '',
                cross: true,
                component: 'окно закрыто'
            }
        default:
            return {...state}
    }
}