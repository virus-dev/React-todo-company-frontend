import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { postRegister } from '../../redux/actionCreators/registerPage'
import { addToastMessage } from '../../redux/actionCreators/toastMessage'
import { Styled } from './register.styled'

const {
    RegisterPage,
    RegisterBlock,
    Form,
    Title,
    FormGroup,
    Label,
    Input,
    Select,
    MessageError,
    Option,
    ButtonsWrapper,
    GoToRegisterBtn,
    SuccessBtn,
} = Styled

interface onSubmitParameters {
    login: string,
    firstName: string,
    secondName: string,
    middleName: string,
    password: string,
    password_repeat: string,
    status: string
}

const Register = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data: onSubmitParameters) => {
        if (data.password !== data.password_repeat) {
            return dispatch(addToastMessage('Пароли не совпадают'))
        }
        dispatch(postRegister(data))
    };

    return (
        <RegisterPage>
            <RegisterBlock>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Title>Регистрация</Title>
                    <FormGroup>
                        <Label htmlFor="login">Введите логин</Label>
                        <Input id="login" name="login" ref={register({ required: true, maxLength: 45 })}></Input>
                        {errors.login && errors.login.type === "required" && <MessageError>Заполните это поле</MessageError>}
                        {errors.login && errors.login.type === "maxLength" && <MessageError>Недопустимая длина поля</MessageError> }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="firstName">Введите имя</Label>
                        <Input id="firstName" name="firstName" ref={register({ required: true, maxLength: 45 })}></Input>
                        {errors.firstName && errors.firstName.type === "required" && <MessageError>Заполните это поле</MessageError>}
                        {errors.firstName && errors.firstName.type === "maxLength" && <MessageError>Недопустимая длина поля</MessageError> }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="secondName">Введите фамилию</Label>
                        <Input id="secondName" name="secondName" ref={register({ required: true, maxLength: 45 })}></Input>
                        {errors.secondName && errors.secondName.type === "required" && <MessageError>Заполните это поле</MessageError>}
                        {errors.secondName && errors.secondName.type === "maxLength" && <MessageError>Недопустимая длина поля</MessageError> }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="middleName">Введите отчество</Label>
                        <Input id="middleName" name="middleName" ref={register({ required: true, maxLength: 45 })}></Input>
                        {errors.middleName && errors.middleName.type === "required" && <MessageError>Заполните это поле</MessageError>}
                        {errors.middleName && errors.middleName.type === "maxLength" && <MessageError>Недопустимая длина поля</MessageError> }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Введите пароль</Label>
                        <Input id="password" name="password" type="password" ref={register({ required: true, maxLength: 45 })}></Input>
                        {errors.password && errors.password.type === "required" && <MessageError>Заполните это поле</MessageError>}
                        {errors.password && errors.password.type === "maxLength" && <MessageError>Недопустимая длина поля</MessageError> }
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password_repeat">Подтвердите пароль</Label>
                        <Input id="password_repeat" name="password_repeat" type="password" ref={register({ required: true })}></Input>
                        {errors.password_repeat && errors.password_repeat.type === "required" && <MessageError>Заполните это поле</MessageError>}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="status">Выберете статус</Label>
                        <Select defaultValue="user" id="status" name="status" ref={register({ required: true })}>
                            <Option value="Руководитель">Руководитель</Option>
                            <Option value="Пользователь">Пользователь</Option>
                        </Select>
                        {errors.status && errors.status.type === "required" && <MessageError>Заполните это поле</MessageError>}
                    </FormGroup>
                    <ButtonsWrapper>
                        <GoToRegisterBtn type="button" onClick={() => { history.push('/login') }}>У меня уже есть аккаунт</GoToRegisterBtn>
                        <SuccessBtn type="submit">Зарегистрироваться</SuccessBtn>
                    </ButtonsWrapper>
                </Form>
            </RegisterBlock>
        </RegisterPage>
    )
}

export default Register
