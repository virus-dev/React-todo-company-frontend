import { combineReducers } from 'redux'
import { userDataReducer } from './userData'
import { toastsReducer } from './toastsReducer'
import { modalReducer } from './modalReducer'
import { modalTaskReducer } from './modalTaskReducer'
import { tasksReducer } from './tasksReducer'

export default combineReducers({
    userData: userDataReducer,
    toasts: toastsReducer,
    modal: modalReducer,
    modalTask: modalTaskReducer,
    tasks: tasksReducer,
})