import { types } from '../types'

interface setUserDataParams {
    login: string,
    password: string
}
export const getUserData = (action: setUserDataParams) => ({
    type: types.GET_USER_DATA,
    payload: action
})

interface setUserDataParams {
    token: string
}
export const setUserData = (token: setUserDataParams) => ({
    type: types.SET_USER_DATA,
    payload: token
})

export const logout = () => ({
    type: types.LOGOUT
})