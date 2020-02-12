import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'


function RouterView(props){
    let {routes} = props;
    //所有重定向的数组,然后循环遍历
    let redirectArr = routes &&routes.filter(item => item.to).map((item,index) => 
    <Redirect key={index} path={item.path} to={item.to}/>);
    //所有不包含重定向的数组
    let routerArr = routes &&routes.filter(item => !item.to)
    return <Switch>
        {
            routerArr &&routerArr.map((item,index) => <Route key={index} path={item.path} render={(props)=>{
                return <item.component {...props} child={item.children}/>
            }}/>).concat(redirectArr)
        }
    </Switch>
}

export default RouterView;