import React from 'react'
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Index from '../views/index/index'
import Login from '../views/login/login'
import Registry from '../views/registry/registry'


function RootRouter(){
    return <BrowserRouter>
        <Switch>
            <Route path="/index" component={Index}/>
            <Route path="/login" component={Login}/>
            <Route path="/registry" component={Registry}/>
            <Redirect path="/" to="/registry"/>
        </Switch>
    </BrowserRouter>
}

export default RootRouter;
