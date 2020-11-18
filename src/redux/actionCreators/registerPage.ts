import { types } from '../types'

export const postRegister = (action: any) => {
    return {
        type: types.POST_REGISTER,
        payload: action
    }
}