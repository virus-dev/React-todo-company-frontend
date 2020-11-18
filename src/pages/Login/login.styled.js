import styled from 'styled-components'
import { theme } from '../../library/theme/theme'

const LoginPage = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoginBlock = styled.div`
    background-color: ${theme.colors.defaultWhite};
    padding: 15px;
    border-radius: ${theme.decoration.defaultRadius};
    border: 1px solid ${theme.colors.defaultBlack};
    width: 320px;
`

const Form = styled.form`

`

const Title = styled.div`
    font-weight: 700;
    font-size: 22px;
`

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px 0;
`

const Label = styled.label`
    font-weight: 700;
    margin-bottom: 5px;
`

const Input = styled.input`
    height: 30px;
    border-radius: ${theme.decoration.miniRadius};
    border-width: 1px;
    padding: 0 10px;
    font-size: 16px;
`

const MessageError = styled.span`
    color: ${theme.colors.defaultRed};
    font-weight: 700;
` 

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

const SuccessBtn = styled.button`
    cursor: pointer;
    font-weight: 700;
    padding: 5px 10px;
    border-radius: ${theme.decoration.miniRadius};
    border-width: 0;
    background-color: ${theme.colors.defaultGreen};
    transition: background-color .1s linear;
    &:hover {
        background-color: ${theme.hoverColors.defaultGreen};
    }
`

const GoToRegisterBtn = styled.button`
    cursor: pointer;
    font-weight: 700;
    padding: 5px 10px;
    border-radius: ${theme.decoration.miniRadius};
    border-width: 0;
    background-color: ${theme.colors.defaultGray};
    transition: background-color .1s linear;
    margin-right: 10px;
    &:hover {
        background-color: ${theme.hoverColors.defaultGray};
    }
`

export const Styled = {
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
}