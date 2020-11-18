import { types } from '../types'

export interface tasksReducer {
    tasks: any
}

export interface tasksState {
    data: any,
    isLoaded: boolean
}

const initialState = {
    data: [],
    isLoaded: true
}

export const tasksReducer = (state: tasksState = initialState, action: any) => {
    switch (action.type) {
        case types.SET_TASKS:

            const newAction = action.payload.map((el: any, i: number) => {

                const endingDate = `${new Date(action.payload[i].endingDate).getDate()}` + `/` + 
                `${new Date(action.payload[i].endingDate).getMonth() + 1}` + `/` + 
                `${new Date(action.payload[i].endingDate).getFullYear()}`

                let color
                if (el.status === 'Выполнена') {
                    color = 'green'
                } else if ( new Date().setDate(new Date().getDate()-1) > new Date(el.endingDate).getTime()) {
                    color = 'red'
                } else {
                    color = 'default'
                }

                return {
                    ...el,
                    endingDate: endingDate,

                    dateOfUpdate:
                    `${new Date(action.payload[i].dateOfUpdate).getDate()}` + `/` + 
                    `${new Date(action.payload[i].dateOfUpdate).getMonth() + 1}` + `/` + 
                    `${new Date(action.payload[i].dateOfUpdate).getFullYear()}`,

                    endingDateValidForNewDate: action.payload[i].endingDate,

                    responsibleId: el.responsible,
                    responsible: el.firstNameUser ? `${el.secondNameUser} ${el.firstNameUser} ${el.middleNameUser}` :'Отсутствует',

                    creator: `${el.secondNameBoss} ${el.firstNameBoss} ${el.middleNameBoss}`,

                    color
                }
            })

            return {
                data: newAction,
                isLoaded: true
            }
        case types.GET_TASK_USER_BY_DATE:
            return {
                data: [],
                isLoaded: false
            }
        case types.GET_ALL_TASKS:
            return {
                data: [],
                isLoaded: false
            }
        case types.GET_ALL_TASKS_USER:
            return {
                data: [],
                isLoaded: false
            }
        default:
            return {...state}
    }
}