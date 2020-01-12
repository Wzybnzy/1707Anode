import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Login from '../views/login/login'
import Registry from '../views/registry/registry'
import Index from '../views/index/index'
import React from 'react'

function RootRouter(){

    return <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/registry" component={Registry}/>
            <Route path="/index" component={Index}/>
            <Redirect path="/" to="/index"/>
        </Switch>
    </BrowserRouter>
}

export default RootRouter;