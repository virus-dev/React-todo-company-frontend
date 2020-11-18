import { types } from '../types'
import { config } from './config'
import axios from 'axios'
import { takeEvery, put, call } from 'redux-saga/effects'
import { addToastMessage, deleteToastMessage } from '../actionCreators/toastMessage'
import { closeModal, closingModal } from '../actionCreators/modal'
import { setUserData } from '../actionCreators/Authorization'
import { logout } from '../actionCreators/Authorization'
import { setTasks } from '../actionCreators/tasks'
import { setUsersForModalTask } from '../actionCreators/modalTask'
import { globalVariables } from '../../globalVariables'
// import moduleName from '../'

export function* sagaWatcher() {
    yield takeEvery(types.POST_REGISTER, postRegister)
    yield takeEvery(types.ADD_TOAST_MESSAGE, deleteToast)
    yield takeEvery(types.GET_USER_DATA, getUserData)
    yield takeEvery(types.CLOSING_MODAL, closingModalFunc)
    yield takeEvery(types.GET_USERS_FOR_MODAL_TASK, getUserForModalTask)
    yield takeEvery(types.ADD_TASK, addTask)
    yield takeEvery(types.GET_ALL_TASKS, getAllTasks)
    yield takeEvery(types.GET_TASK_USER_BY_DATE, getTasksByDate)
    yield takeEvery(types.UPDATE_TASK_FROM_BOSS, updateTaskFromBoss)
    yield takeEvery(types.UPDATE_TASK_FROM_RESPONSIVE, updateTaskFromResponsive)
    yield takeEvery(types.GET_ALL_TASKS_USER, getAllTasksUser)
}

async function delay(ms: number) {
    return new Promise(r => setTimeout(() => r(), ms))
}

// postRegister
function* postRegister(action: any) {
    const data = yield call(fetchPostRegister, action)
    yield put(addToastMessage(data.data.message))
}

async function fetchPostRegister(action: any) {
    return await axios.post(`${config.baseURL}/api/auth/register`, action.payload)
        .then(res => {
            return res
        })
        .catch(e => {
            return e.response
        })
}
// postRegister

// deleteToastMessage
function* deleteToast() {
    yield delay(3000)
    yield put(deleteToastMessage())
}
// deleteToastMessage

// getUserData
function* getUserData(action: any) {
    const data = yield call(fetchUserData, action.payload)
    if (data.status >= 400) {
        yield put(addToastMessage(data.data.message))
    } else {
        localStorage.setItem('userData__floorTestTask', JSON.stringify(
            { userData: { data: data.data, isAuthenticated: true } }
        ))
        yield put(setUserData(data.data))
    }
}

async function fetchUserData(payload: any) {
    return await axios.post(`${config.baseURL}/api/auth/login`, {...payload})
        .then(res => {
            return res
        })
        .catch(e => {
            return e.response
        })
}
// getUserData

// closingModal
function* closingModalFunc() {
    yield delay(500)
    yield put(closeModal())
}
// closingModal

// getUserForModalTask
function* getUserForModalTask(action: any) {
    const data = yield call(fetchUserForModalTask, action.payload)
    console.log(data)
    if (data.data === "Unauthorized") {
        localStorage.removeItem('userData__floorTestTask')
        yield put(addToastMessage('Вы не авторизованы, войдите в аккаунт снова'))
        yield put(closingModal())
        yield put(setUsersForModalTask([]))
        yield put(logout())
    } else {
        yield put(setUsersForModalTask(data.data))
    }
}

async function fetchUserForModalTask(token: string) {
    return await axios.get(`${config.baseURL}/api/getUsersForModalTask`, { headers: {"Authorization": token} })
        .then(res => {
            return res
        })
        .catch(e => {
            return e.response
        })
}
// getUserForModalTask

// addTask
function* addTask(action: any) {
    const data = yield call(postNewTask, action.payload)
    yield put(closingModal())
    yield put(addToastMessage(data.data.message))
}

async function postNewTask(payload: any) {
    return await axios.post(`${config.baseURL}/api/addTask`, {...payload.task}, {headers: {"Authorization": payload.token} })
        .then(res => {
            return res
        })
        .catch(e => {
            return e.response
        })
}
// addTask

// getAllTasks
function* getAllTasks(action: any) {
    const data = yield call(fetchAllTasks, action.payload)
    if (data.data === "Unauthorized") {
        localStorage.removeItem('userData__floorTestTask')
        yield put(addToastMessage('Вы не авторизованы, войдите в аккаунт снова'))
        yield put(logout())
    } else {
        if (data.status === 200) {
            yield put(setTasks(data.data))
        } else {
            yield put(addToastMessage('Задачи не загрузились'))
        }
    }
}

async function fetchAllTasks(token: string) {
    return await axios.get(`${config.baseURL}/api/getAllTasks`, {headers: {"Authorization": token} })
        .then(res => res)
        .catch(e => e.response)
}
// getAllTasks

// getTasksByDate
function* getTasksByDate(action: any) {
    const data = yield call(fetchTasksByDate, action.payload)
    if (data.data === "Unauthorized") {
        localStorage.removeItem('userData__floorTestTask')
        yield put(addToastMessage('Вы не авторизованы, войдите в аккаунт снова'))
        yield put(logout())
    } else {
        if (data.status === 200) {
            yield put(setTasks(data.data))
        } else {
            yield put(addToastMessage('Задачи не загрузились'))
        }
    }
}

async function fetchTasksByDate(payload: any) {
    return await axios.post(`${config.baseURL}/api/getTasksByDate`, {date: payload.date, userId: payload.userId}, {headers: {"Authorization": payload.token} })
        .then(res => res)
        .catch(e => e.response)
}
// getTasksByDate

// updateTaskFromBoss
function* updateTaskFromBoss(action: any) {
    const data = yield call(fetchUpdateTaskFromBoss, action.payload)
    if (data.data === "Unauthorized") {
        localStorage.removeItem('userData__floorTestTask')
        yield put(addToastMessage('Вы не авторизованы, войдите в аккаунт снова'))
        yield put(logout())
    } else {
        if (data.status < 300) {
            yield put(addToastMessage(data.data.message))
            yield put(closingModal())
        } else {
            yield put(addToastMessage('Задача не обновилась'))
        }
    }
}

async function fetchUpdateTaskFromBoss(payload: any) {
    return await axios.post(`${config.baseURL}/api/updateTaskFromBoss`, {...payload.task}, {headers: {"Authorization": payload.token} })
        .then(res => res)
        .catch(e => e.response)
}
// updateTaskFromBoss

// updateTaskFromResponsive
function* updateTaskFromResponsive(action: any) {
    const data = yield call(fetchUpdateTaskFromResponsive, action.payload)
    if (data.data === "Unauthorized") {
        localStorage.removeItem('userData__floorTestTask')
        yield put(addToastMessage('Вы не авторизованы, войдите в аккаунт снова'))
        yield put(logout())
    } else {
        if (data.status < 300) {
            yield put(addToastMessage(data.data.message))
            yield put(closingModal())
        } else {
            yield put(addToastMessage('Задача не обновилась'))
        }
    }
}

async function fetchUpdateTaskFromResponsive(payload: any) {
    return await axios.post(`${config.baseURL}/api/updateTaskFromResponsive`, {...payload.task}, {headers: {"Authorization": payload.token} })
        .then(res => res)
        .catch(e => e.response)
}
// updateTaskFromResponsive

// getAllTasksUser
function* getAllTasksUser(action: any) {
    const data = yield call(fetchAllTasksUser, action.payload)
    if (data.data === "Unauthorized") {
        localStorage.removeItem('userData__floorTestTask')
        yield put(addToastMessage('Вы не авторизованы, войдите в аккаунт снова'))
        yield put(logout())
    } else {
        if (data.status === 200) {
            yield put(setTasks(data.data))
        } else {
            yield put(addToastMessage('Задачи не загрузились'))
        }
    }
}

async function fetchAllTasksUser(payload: any) {
    return await axios.post(`${config.baseURL}/api/getTasksUser`, {userId: payload.userId}, {headers: {"Authorization": payload.token} })
        .then(res => res)
        .catch(e => e.response)
}
// getAllTasksUser