import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Login, Register, Tasks } from './index'

// Данный хук используется для роутинга страниц в приложении
export const useRoutes = ( isAuthenticated: boolean ): any => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/tasks" exact>
                    <Tasks />
                </Route>
                <Redirect to="/tasks" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <Login />
            </Route>
            <Route path="/register" exact>
                <Register />
            </Route>
            <Redirect to="/login" />
        </Switch>
    )
}