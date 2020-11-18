import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getUserData } from '../../redux/actionCreators/Authorization'
import { Styled } from './login.styled'

const {
    LoginPage,
    LoginBlock,
    Form,
    Title,
    FormGroup,
    Label,
    Input,
    MessageError,
    ButtonsWrapper,
    SuccessBtn,
    GoToRegisterBtn
} = Styled

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data: any) => {
        dispatch(getUserData(data))
    };

    return (
        <LoginPage>
            <LoginBlock>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Title>Авторизация</Title>
                    <FormGroup>
                        <Label htmlFor="login">Введите логин</Label>
                        <Input id="login" name="login" type="text" ref={register({ required: true })}></Input>
                        {errors.login && errors.login.type === "required" && <MessageError>Заполните это поле</MessageError>}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Введите пароль</Label>
                        <Input id="password" name="password" type="password" ref={register({ required: true })}></Input>
                        {errors.password && errors.password.type === "required" && <MessageError>Заполните это поле</MessageError>}
                    </FormGroup>
                    <ButtonsWrapper>
                        <GoToRegisterBtn type="button" onClick={() => { history.push('/register') }}>Зарегистрироваться</GoToRegisterBtn>
                        <SuccessBtn type="submit">Войти</SuccessBtn>
                    </ButtonsWrapper>
                </Form>
            </LoginBlock>
        </LoginPage>
    )
}

export default Login
