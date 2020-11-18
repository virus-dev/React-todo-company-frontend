import styled from 'styled-components'
import { theme } from '../../library/theme/theme'

const TasksPage = styled.div`
    margin: 15px 0;
`

const UserBlock = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`

const FullName = styled.div`
    font-weight: 700;
    font-size: 22px;
`

const StatusUser = styled.div`
    font-weight: 700;
    font-size: 22px;
`

const LogoutBtn = styled.button`
    cursor: pointer;
    font-weight: 700;
    font-size: 16px;
    background-color: ${theme.colors.defaultGray};
    transition: background-color .1s linear;
    color: ${theme.colors.defaultWhite};
    padding: 10px 15px;
    border-width: 0px;
    border-radius: ${theme.decoration.miniRadius};
    &:hover {
        background-color: ${theme.hoverColors.defaultGray};
    }
`

const AddTaskBlock = styled.div`
    text-align: right;
`

const AddTask = styled.button`
    cursor: pointer;
    font-weight: 700;
    font-size: 16px;
    background-color: ${theme.colors.defaultBlue};
    transition: background-color .1s linear;
    color: ${theme.colors.defaultWhite};
    padding: 10px 15px;
    border-width: 0px;
    border-radius: ${theme.decoration.miniRadius};
    &:hover {
        background-color: ${theme.hoverColors.defaultBlue};
    }
`

const SortByBlock = styled.div`
    display: flex;
`

const SortByText = styled.div`

`

const SortSelect = styled.select`

`

const Option = styled.option`

`

const TasksWrapper = styled.div`
    display: grid;
    margin: 25px 0;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
`

export const Styled = {
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
}