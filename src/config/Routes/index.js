import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from '../../pages/Login'
import MainApp from '../../pages/MainApp'
import Register from '../../pages/Register'


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/" component={MainApp}/>
            </Switch>
        </Router>
    )
}

export default Routes
