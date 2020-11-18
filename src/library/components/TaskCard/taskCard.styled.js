import styled from 'styled-components'
import { theme } from '../../theme/theme'

const TaskCardBlock = styled.div`
    border: 1px solid ${theme.colors.defaultGray};
    border-radius: ${theme.decoration.defaultRadius};
    padding: 15px;
    & span {
        font-weight: 700;
    }
`

const Title = styled.div`
    font-weight: 700;
    font-size: 16;
    margin-bottom: 10px;
`

const EndingDate = styled.div`

`

const UpdateDate = styled.div`

`

const Priority = styled.div`

`

const Status = styled.div`

`

const Creator = styled.div`

`

const Responsible = styled.div`

`

const Button = styled.button`
    cursor: pointer;
    color: ${theme.colors.defaultBlack};
    font-weight: 700;
    margin-top: 10px;
    border-radius: ${theme.decoration.miniRadius};
    background-color: ${theme.colors.defaultOrange};
    transition: background-color .1s linear;
    border-width: 0px;
    padding: 5px 10px;
    &:hover {
        background-color: ${theme.hoverColors.defaultOrange};
    }
`

const Red = styled.span `
    color: ${theme.colors.defaultRed};
`

const Green = styled.span `
    color: ${theme.colors.defaultGreen};
`

export const Styled = {
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
}