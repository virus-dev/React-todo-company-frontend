import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userDataReducer, userDataState } from '../../../redux/reducers/userData'
import { modalSetTitleCrossComponent } from '../../../redux/actionCreators/modal'
import { ModalUpadateTaskByBoss } from '../componentsForModal/ModalUpadateTaskByBoss/ModalUpadateTaskByBoss'
import { ModalUpadateTaskByResponsible } from '../componentsForModal/ModalUpadateTaskByResponsible/ModalUpadateTaskByResponsible'
import { ModalUpadateTaskByUser } from '../componentsForModal/ModalTaskByUser/ModalTaskByUser'
import { Styled } from './taskCard.styled'

const {
    TaskCardBlock,
    Title,
    EndingDate,
    UpdateDate,
    Priority,
    Status,
    Creator,
    Responsible,
    Button,
    Red,
    Green
} = Styled

interface TaskCardProps {
    title: string,
    endingDate: string,
    dateOfUpdate: string,
    priority: string,
    status: string,
    creator: string,
    responsible: string,
    responsibleId: number,
    index: number,
    color: string
}

export const TaskCard: React.FC <TaskCardProps> = ({
    title,
    endingDate,
    dateOfUpdate,
    priority,
    status,
    creator,
    responsible,
    responsibleId,
    index,
    color
}) => {
    const dispatch = useDispatch()
    const userData = useSelector<userDataReducer, userDataState["data"]>(state => state.userData.data)

    const modalOpenByBoss = () => {
        dispatch(modalSetTitleCrossComponent({
            title: 'Обновите задачу', cross: true, component: <ModalUpadateTaskByBoss index={index} />
        }))
    }

    const modalOpenByResponsible = () => {
        dispatch(modalSetTitleCrossComponent({
            title: 'Обновите задачу', cross: true, component: <ModalUpadateTaskByResponsible index={index} />
        }))
    }

    const modalOpenByUser = () => {
        dispatch(modalSetTitleCrossComponent({
            title: 'Задача', cross: true, component: <ModalUpadateTaskByUser index={index} />
        }))
    }

    return (
        <TaskCardBlock>
            <Title>{title}</Title>
            <Status><span>Статус:</span> {status}</Status>
            <Priority><span>Приоритет:</span> {priority}</Priority>
            <Creator><span>Создатель:</span> {creator}</Creator>
            <Responsible><span>Ответственный:</span> {responsible}</Responsible>
            <UpdateDate><span>Дата обновления:</span> {dateOfUpdate}</UpdateDate>
            <EndingDate><span>Дата окончания (включительно): </span> 
            {
                color !== 'default'
                ?
                    color === 'red'
                    ?
                    <Red>{endingDate}</Red>
                    :
                    <Green>{endingDate}</Green>
                :
                endingDate
            }
            </EndingDate>
            {
                userData.status === 'Руководитель'
                ?
                <Button onClick={modalOpenByBoss}>Подробнее/Изменить</Button>
                :
                    userData.userId === responsibleId
                    ?
                    <Button onClick={modalOpenByResponsible}>Подробнее/Изменить</Button>
                    :
                    <Button onClick={modalOpenByUser}>Подробнее</Button>
            }
        </TaskCardBlock>
    )
}
