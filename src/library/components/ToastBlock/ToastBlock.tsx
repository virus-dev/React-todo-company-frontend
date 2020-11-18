import React from 'react'
import { useSelector } from 'react-redux'
import { toastsReducer, toastsState } from '../../../redux/reducers/toastsReducer'
import { Styled } from './toast.styled'

const {
    ToastWrapper,
    ToastItem
} = Styled

export const ToastBlock: React.FC = () => {
    const state = useSelector<toastsReducer, toastsState["toasts"]>(state => state.toasts.toasts)

    const ToastItems = React.useMemo(() => {
        return state.map((el: string, i: number) => {
            return <ToastItem key={el + i}>{el}</ToastItem>
        })
    }, [state])

    return (
        <ToastWrapper>
            {
                ToastItems
            }
        </ToastWrapper>
    )
}
