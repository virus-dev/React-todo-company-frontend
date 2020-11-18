import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalReducer, modalState } from '../../../redux/reducers/modalReducer'
import { closingModal } from '../../../redux/actionCreators/modal'
import cross from '../../media/icons/cross.svg'
import { Styled } from './modal.styled'

const {
    ModalBackground,
    ModalBlock,
    ModalHeader,
    ModalHeaderTitle,
    ModalHeaderCross,
    ModalComponent
} = Styled

export const Modal: React.FC = () => {
    const dispatch = useDispatch()
    const modal = useSelector<modalReducer, modalState["component"]>(state => state.modal)

    const [ready, setReady] = React.useState<boolean>(false)
    const [disableClick, setDisableClick] = React.useState<boolean>(false)
    const modalRef = React.useRef(null)

    React.useEffect(() => {
        setReady(true)
        document.querySelector('body')?.classList.add('modal-open')
        document.body.addEventListener('mousedown', handleClick)
        document.body.addEventListener('keydown', handleKeyPress)

        return () => {
            document.querySelector('body')?.classList.remove('modal-open')
            document.body.removeEventListener('mousedown', handleClick)
            document.body.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    const handleClick = (e:any) :void => {
        if (!e.path.includes(modalRef.current) && !disableClick) {
            closeModalWindow()
        }
    }

    const handleKeyPress = (e:any) => {
        if (e.keyCode === 27) {
            closeModalWindow()
        }
    }

    const closeModalWindow = () => {
        setReady(false)
        dispatch(closingModal())
    }

    return (
        <ModalBackground transition={ready ? 'transition' : ''}>
            <ModalBlock ref={modalRef} transition={ready ? 'transition' : ''}>
                <ModalHeader>
                    <ModalHeaderTitle>{modal.title}</ModalHeaderTitle>
                    <ModalHeaderCross src={cross} alt="Крестик" onClick={closeModalWindow} />
                </ModalHeader>

                <ModalComponent>
                    {modal.component}
                </ModalComponent>

            </ModalBlock>
        </ModalBackground>
    )
}
