import { types } from '../types'

export interface userDataReducer {
    userData: any
}

export interface userDataState {
    isAuthenticated: boolean,
    data: any
}

const initialState = {
    isAuthenticated: false,
    data: {}
}

export const userDataReducer = (state: userDataState = initialState, action: any) => {
    switch (action.type) {
        case types.SET_USER_DATA:
            return {
                isAuthenticated: true,
                data: action.payload
            }
        case types.LOGOUT:
            localStorage.removeItem("userData__floorTestTask")
            return {
                isAuthenticated: false,
                data: {}
            }
        default:
            return {...state}
    }
}