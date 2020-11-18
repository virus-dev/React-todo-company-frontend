import { types } from '../types'

interface modalSetTitleCrossComponentAction {
    title: string,
    cross: boolean,
    component: any
}
export const modalSetTitleCrossComponent = (action: modalSetTitleCrossComponentAction) => ({
    type: types.MODAL_SET_TITLE_CROSS_COMPONENT,
    payload: action
})


export const closingModal = () => ({
    type: types.CLOSING_MODAL
})

export const closeModal = () => ({
    type: types.CLOSE_MODAL
})