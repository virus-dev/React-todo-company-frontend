import React from 'react';
import { useRoutes } from './pages/routes'
import { useSelector } from 'react-redux'
import { userDataReducer, userDataState } from './redux/reducers/userData'
import { modalReducer, modalState } from './redux/reducers/modalReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastBlock } from './library/components/ToastBlock/ToastBlock'
import { Modal } from './library/components/Modal/Modal'
import { Styled } from './app.styled'

const {
    Container
} = Styled

function App() {
    // routes logic
    const isAuthenticated = useSelector<userDataReducer, userDataState["isAuthenticated"]>(state => state.userData.isAuthenticated)
    const routes = useRoutes(isAuthenticated)
    // routes logic

    // modal logic
    const modalIsOpen = useSelector<modalReducer, modalState["isOpen"]>(state => state.modal.isOpen)
    // modal logic

    return (
        <Router>
            <Container>
                {routes}
            </Container>
            <ToastBlock />
            { modalIsOpen && <Modal /> }
        </Router>
    );
}

export default App;
