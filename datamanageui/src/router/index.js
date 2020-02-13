import React from 'react'

import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Login from '../views/login'
import Registry from '../views/registry'
import Home from '../views/home'
function RootRouter(){
    return <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/registry" component={Registry}/>
            <Route path="/home" component={Home}/>
            <Redirect path="/" to="/login"/>
        </Switch>
    </BrowserRouter>
}

export default RootRouter;