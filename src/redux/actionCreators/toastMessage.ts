import { types } from '../types'

// Данный action ловит redux и отображает текст на экране
export const addToastMessage = (text: string) => ({
    type: types.ADD_TOAST_MESSAGE,
    payload: text
})

export const deleteToastMessage = () => ({
    type: types.DELETE_TOAST_MESSAGE
})