import styled from 'styled-components'
import { theme } from '../../../theme/theme'

const ModalTaskWrapper = styled.div`
    margin: 15px;
`

const ModalTaskForm = styled.div`

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
    cursor: pointer;
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

const TextArea = styled.textarea`
    resize: vertical;
    border: 1px solid ${theme.colors.defaultBlack};
    padding: 5px;
`

const Select = styled.select`
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

const Option = styled.option`
    
`

const ButtonsWrapper = styled.div`
    
`

const CloseBtn = styled.button`
    
`



export const Styled = {
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
}