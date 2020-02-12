import React from 'react'
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Login from '../views/login';
import Registry from '../views/registry';
import Home from '../views/home/home';

import routes from './routerconfig'
import RouterView from './routerview'

function RootRouter(){//一级路由
    return <BrowserRouter> 
    <RouterView routes={routes}/>
        {/* <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/registry" render={(props)=>{
                
            }}/>
            <Route path="/home" component={Home}/>
            <Redirect path="/" to="/login"/>
        </Switch> */}
    </BrowserRouter>
}

export default RootRouter;