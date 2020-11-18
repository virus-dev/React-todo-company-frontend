import styled from 'styled-components'
import { theme } from '../../theme/theme'

const ToastWrapper = styled.div`
    position: fixed;
    bottom: 10px;
    right: 10px;
`

const ToastItem = styled.div`
    padding: 10px 15px;
    margin-top: 10px;
    background-color: ${theme.colors.defaultGray};
    font-weight: 700;
    border-radius: ${theme.decoration.miniRadius};
`

export const Styled = {
    ToastWrapper,
    ToastItem
}