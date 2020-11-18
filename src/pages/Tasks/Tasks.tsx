import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalSetTitleCrossComponent } from '../../redux/actionCreators/modal'
import { userDataReducer, userDataState } from '../../redux/reducers/userData'
import { ModalTask } from '../../library/components/componentsForModal/ModalTask/ModalTask'
import { getAllTasks, getTasksByDate, getAllTasksUser } from '../../redux/actionCreators/tasks'
import { TaskCard } from '../../library/components/TaskCard/TaskCard'
import { logout } from '../../redux/actionCreators/Authorization'
import { Styled } from './tasks.styled'
import { tasksReducer, tasksState } from '../../redux/reducers/tasksReducer'
import { modalTaskReducer, modalTaskState } from '../../redux/reducers/modalTaskReducer'
import { getUsersForModalTask } from '../../redux/actionCreators/modalTask'

const {
    TasksPage,
    UserBlock,
    FullName,
    StatusUser,
    LogoutBtn,
    AddTaskBlock,
    AddTask,
    SortByBlock,
    SortByText,
    SortSelect,
    Option,
    TasksWrapper,
} = Styled

const Tasks = () => {
    const dispatch = useDispatch()
    const selectSortRef= React.useRef(null)

    const modalOpen = () => {
        dispatch(modalSetTitleCrossComponent({
            title: 'Добавьте задачу', cross: true, component: <ModalTask />
        }))
    }

    React.useEffect(() => { dispatch(getAllTasks(userData.token)) }, [])

    const selectSortHandler = (e: any) => {
        switch (e.target.value) {
            case 'all':
                dispatch(getAllTasks(userData.token))
                break;
            case 'today':
                dispatch(getTasksByDate({token: userData.token, userId: userData.userId, 
                    date: new Date().toISOString()}))
                break;
            case 'week':
                dispatch(getTasksByDate({token: userData.token, userId: userData.userId,
                    date: new Date().setDate(new Date().getDate() + 7)}))
                break;
            case 'month':
                dispatch(getTasksByDate({token: userData.token, userId: userData.userId, 
                    date: new Date().setDate(new Date().getDate() + 30)}))
                break;
            default:
                if (typeof +e.target.value === 'number') {
                    dispatch(getAllTasksUser({userId:e.target.value, token:userData.token}))
                }
                break;
        }
    }

    const userData = useSelector<userDataReducer, userDataState["data"]>(state => state.userData.data)
    const tasks = useSelector<tasksReducer, tasksState["data"]>(state => state.tasks.data)
    const tasksIsLoaded = useSelector<tasksReducer, tasksState["isLoaded"]>(state => state.tasks.isLoaded)

    const tasksRender = React.useMemo(() => {
        return tasks.map((el: any, i: number) => {
            return <TaskCard
                key={el.title + el.dateOfUpdate + el.responsible + i}
                title={el.title}
                endingDate={el.endingDate}
                dateOfUpdate={el.dateOfUpdate}
                priority={el.priority}
                status={el.status}
                creator={el.creator}
                responsible={el.responsible}
                color={el.color}
                responsibleId={el.responsibleId}
                index={i}
            />
        })
    }, [tasks])

    React.useEffect(() => {
        dispatch(getUsersForModalTask(userData.token))
    }, [])

    const modalTaskUsers = useSelector<modalTaskReducer, modalTaskState["users"]>(state => state.modalTask.users)
    const modalTaskIsLoaded = useSelector<modalTaskReducer, modalTaskState["isLoaded"]>(state => state.modalTask.isLoaded)
    const responsibleSelectOptions = React.useMemo(() => {
        if (modalTaskIsLoaded) {
            return modalTaskUsers.map((el: any, i: number) => {
                return <Option value={el.userId} key={el.fullName + el.userId + i}>{el.fullName}</Option>
            })
        } else {
            return <Option value="loading">Loading...</Option>
        }
    }, [modalTaskUsers, modalTaskIsLoaded])

    return (
        <TasksPage>
            <UserBlock>
                <FullName>{userData.fullName}</FullName>
                <StatusUser>{userData.status}</StatusUser>
                <LogoutBtn onClick={() => dispatch(logout())}>Выйти</LogoutBtn>
            </UserBlock>
            {
                userData.status === 'Руководитель'
                ?   
                <AddTaskBlock>
                    <AddTask onClick={modalOpen}>Добавить задачу</AddTask>
                </AddTaskBlock>
                : ''
            }
            <SortByBlock>
                <SortByText>Отоброзить задачи: </SortByText>
                <SortSelect onChange={selectSortHandler} ref={selectSortRef}>
                    <Option value="all">Все</Option>
                    {
                        userData.status === 'Руководитель'
                        ?
                        
                        responsibleSelectOptions
                        
                        : 
                        <>
                        <Option value="today">на сегодня</Option>
                        <Option value="week">на неделю</Option>
                        <Option value="month">на месяц</Option>
                        </>
                    }
                </SortSelect>
            </SortByBlock>
            <TasksWrapper>
                    {
                        tasksIsLoaded
                        ?
                            tasksRender.length ? tasksRender : "Задач нет"
                        :
                        'Загрузка...'
                    }
            </TasksWrapper>
        </TasksPage>
    )
}

export default Tasks
