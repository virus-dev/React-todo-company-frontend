import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { userDataReducer, userDataState } from '../../../../redux/reducers/userData'
import { tasksReducer, tasksState } from '../../../../redux/reducers/tasksReducer'
import { updateTasksFromResponsive } from '../../../../redux/actionCreators/tasks'
import { Styled } from './ModalUpadateTaskByResponsible.styled'

const {
    ModalTaskWrapper,
    ModalTaskForm,
    Form,
    Text,
    FormGroup,
    Label,
    Input,
    TextArea,
    Select,
    MessageError,
    Option,
    ButtonsWrapper,
    CloseBtn,
} = Styled

interface ModalUpadateTaskByResponsibleProps {
    index: number
}

export const ModalUpadateTaskByResponsible: React.FC <ModalUpadateTaskByResponsibleProps> = ({index}) => {
    const dispatch = useDispatch()
    const token = useSelector<userDataReducer, userDataState["data"]>(state => state.userData.data.token)
    const defaultState = useSelector<tasksReducer, tasksState["data"]>(state => state.tasks.data[index])
    const { register, handleSubmit} = useForm();
    const onSubmit = (status: any) => {
        const task = {
            taskId: defaultState.id,
            status
        }
        dispatch(updateTasksFromResponsive({task, token}))
    };

    console.log(defaultState)

    return (
        <ModalTaskWrapper>
            <ModalTaskForm>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Text><span>Заголовок: </span>{defaultState.title}</Text>
                    <Text><span>Описание: </span>{defaultState.description}</Text>
                    <Text><span>Дата окончания: </span>{defaultState.endingDate}</Text>
                    <Text><span>Приоритет: </span>{defaultState.priority}</Text>
                    <Text><span>Статус: </span>{defaultState.status}</Text>
                    <Text><span>Создатель: </span>{defaultState.creator}</Text>
                    <Text><span>Ответственный: </span>{defaultState.responsible}</Text>
                    <FormGroup>
                        <Label htmlFor="status">Обновите статус</Label>
                        <Select id="status" name="status" defaultValue={defaultState.status} ref={register}>
                            <Option value="Выполняется">Выполняется</Option>
                            <Option value="Выполнена">Выполнена</Option>
                        </Select>
                    </FormGroup>
                    <ButtonsWrapper>
                        <CloseBtn type="submit">Обновить</CloseBtn>
                    </ButtonsWrapper>
                </Form>
            </ModalTaskForm>
        </ModalTaskWrapper>
    )
}