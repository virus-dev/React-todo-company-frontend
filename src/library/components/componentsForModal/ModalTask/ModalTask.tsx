import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersForModalTask } from '../../../../redux/actionCreators/modalTask'
import { userDataReducer, userDataState } from '../../../../redux/reducers/userData'
import { modalTaskReducer, modalTaskState } from '../../../../redux/reducers/modalTaskReducer'
import { addTask } from '../../../../redux/actionCreators/tasks'
import { Styled } from './modalTask.styled'

const {
    ModalTaskWrapper,
    ModalTaskForm,
    Form,
    Title,
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

export const ModalTask = () => {
    const dispatch = useDispatch()
    const token = useSelector<userDataReducer, userDataState["data"]>(state => state.userData.data.token)
    const userId = useSelector<userDataReducer, userDataState["data"]>(state => state.userData.data.userId)
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data: any) => {

        // +1 нужен для того, чтобы можно было поставить сегодняшнюю задачу
        if (new Date(`${data.year}/${data.month}/${+data.number+1}`).getTime() < Date.now()) {
            if (window.confirm('Вы точно хотите добавить просроченную задачу?')) {} 
            else { return false }
        }

        // Если нет ответственного, то его id будет -1
        if (data.responsible === undefined) { data.responsible = -1 }

        const dataNow = 
            `${new Date().getFullYear()}` +
            '-' +
            `${("0" + ((new Date()).getMonth() + 1)).slice(-2)}` +
            '-' +
            `${("0" + ((new Date()).getDate())).slice(-2)}`
        
        const task = {
            title: data.title,
            description: data.description,
            endingDate: `${data.year}/${data.month}/${data.number}`,
            creationDate: dataNow,
            dateOfUpdate: dataNow,
            priority: data.priority,
            status: data.status,
            creator: userId,
            responsible: data.responsible,
        }

        console.log(task)

        dispatch(addTask({task, token}))
    };
    
    const watchStatus = watch('status', 'К выполнению')
    React.useEffect(() => {
        if (watchStatus !== 'К выполнению') {
            dispatch(getUsersForModalTask(token))
        }
    }, [watchStatus])

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
        <ModalTaskWrapper>
            <ModalTaskForm>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label htmlFor="title">Введите заголовок</Label>
                        <Input id="title" name="title" defaultValue="1" ref={register({ required: true, maxLength: 45 })}></Input>
                        {errors.title && errors.title.type === "required" && <MessageError>Заполните это поле</MessageError>}
                        {errors.title && errors.title.type === "maxLength" && <MessageError>Недопустимая длина поля</MessageError> }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Введите описание</Label>
                        <TextArea id="description" name="description" defaultValue="1" ref={register({ required: true, maxLength: 255 })}></TextArea>
                        {errors.description && errors.description.type === "required" && <MessageError>Заполните это поле</MessageError>}
                        {errors.description && errors.description.type === "maxLength" && <MessageError>Недопустимая длина поля</MessageError> }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="number">Введите число окончания</Label>
                        <Input id="number" name="number" type="number" defaultValue="20" ref={register({ required: true, min: 1, max: 31 })}></Input>
                        {errors.number && errors.number.type === "required" && <MessageError>Заполните это поле</MessageError>}
                        {errors.number && errors.number.type === "min" && <MessageError>Минимальное число: 1</MessageError> }
                        {errors.number && errors.number.type === "max" && <MessageError>Максимальное число: 31</MessageError> }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="month">Введите месяц окончания</Label>
                        <Input id="month" name="month" type="number" defaultValue={new Date().getMonth() + 1} ref={register({ required: true, min: 1, max: 12 })}></Input>
                        {errors.month && errors.month.type === "required" && <MessageError>Заполните это поле</MessageError>}
                        {errors.month && errors.month.type === "min" && <MessageError>Минимальное число: 1</MessageError> }
                        {errors.month && errors.month.type === "max" && <MessageError>Максимальное число: 12</MessageError> }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="year">Введите год окончания</Label>
                        <Input id="year" name="year" type="number" defaultValue={new Date().getFullYear()} ref={register({ required: true, min: 1970, max: 2030 })}></Input>
                        {errors.year && errors.year.type === "required" && <MessageError>Заполните это поле</MessageError>}
                        {errors.year && errors.year.type === "min" && <MessageError>Минимальное число: 1970</MessageError> }
                        {errors.year && errors.year.type === "max" && <MessageError>Максимальное число: 2030</MessageError> }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="priority">Выберете приоритет</Label>
                        <Select id="priority" name="priority" ref={register}>
                            <Option value="Низкий">Низкий</Option>
                            <Option value="Средний">Средний</Option>
                            <Option value="Высокий">Высокий</Option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="status">Выберете статус</Label>
                        <Select id="status" name="status" ref={register}>
                            <Option value="К выполнению">К выполнению</Option>
                            <Option value="Выполняется">Выполняется</Option>
                            <Option value="Выполнена">Выполнена</Option>
                            <Option value="Отменена">Отменена</Option>
                        </Select>
                    </FormGroup>
                    {
                        watchStatus !== 'К выполнению'
                            ? <FormGroup>
                                    <Label htmlFor="responsible">Выберете ответственного</Label>
                                    <Select id="responsible" name="responsible" ref={register}>
                                    {
                                        responsibleSelectOptions
                                    }
                                    </Select>
                                </FormGroup>
                            : ''
                    }
                    <ButtonsWrapper>
                        <CloseBtn type="submit" disabled={!modalTaskIsLoaded}>Создать</CloseBtn>
                    </ButtonsWrapper>
                </Form>
            </ModalTaskForm>
        </ModalTaskWrapper>
    )
}
