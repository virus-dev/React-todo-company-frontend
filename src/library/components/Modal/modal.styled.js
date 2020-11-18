import styled from 'styled-components'
import { theme } from '../../theme/theme'

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    transition: background-color .4s linear;
    background-color: ${props => props.transition ? 'rgba(000, 000, 000, .3)' : ''};
`

const ModalBlock = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: ${props => props.transition ? 'translate(-50%, -50%)' : 'translate(-50%, -70%)'};
    width: 400px;
    transition: all .4s linear;
    border-radius: ${theme.decoration.defaultRadius};
    background-color: ${theme.colors.defaultWhite};
    opacity: ${props => props.transition ? `1` : '0'};
`

const ModalHeader = styled.div`
    padding: 10px 15px;
    border-bottom: 1px solid ${theme.colors.defaultBlack};
    display: flex;
    justify-content: space-between;
`

const ModalHeaderTitle = styled.div`
    
`

const ModalHeaderCross = styled.img`
    color: ${theme.colors.defaultBlack};
    cursor: pointer;
`

const ModalComponent = styled.div`

`

export const Styled = {
    ModalBackground,
    ModalBlock,
    ModalHeader,
    ModalHeaderTitle,
    ModalHeaderCross,
    ModalComponent
}