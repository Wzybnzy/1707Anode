// import Registry from "../views/registry";
// import Login from "../views/login";
// import Home from "../views/home/home";
// import Approval from "../views/home/approval/approval";
// import Myreserve from "../views/home/myreserve/myreserve";
// import Reserve from "../views/home/reserve/reserve";
// import Myreser from "../views/home/myreser/myreser";
// import()  //按需加载视图 
import React from 'react' 

import Loadable from 'react-loadable'
function Loading(){
    return <div>loading....</div>
}

const Login = Loadable({
    loader:()=> import('../views/login'),
    loading:Loading
})

const Registry = Loadable({
    loader:()=> import('../views/registry'),
    loading:Loading
})
const Home = Loadable({
    loader:()=> import('../views/home/home'),
    loading:Loading
})
const Approval = Loadable({
    loader:()=> import('../views/home/approval/approval'),
    loading:Loading
})
const Myreserve = Loadable({
    loader:()=> import('../views/home/myreserve/myreserve'),
    loading:Loading
})
const Reserve = Loadable({
    loader:()=> import('../views/home/reserve/reserve'),
    loading:Loading
})
const Myreser = Loadable({
    loader:()=> import('../views/home/myreser/myreser'),
    loading:Loading
})
const routes = [
    {
        path:'/login',
        component:Login
    },
    {
        path:'/registry',
        component:Registry
    },
    {
        path:'/home',
        component:Home,
        children:[
            {
                path:'/home/approval',
                component:Approval
            },
            {
                path:'/home/myreser',
                component:Myreser
            },
            {
                path:'/home/Myreserve',
                component:Myreserve
            },
            {
                path:'/home/reserve',
                component:Reserve
            },
            {
                path:'/home',
                to:'/home/approval'
            }
        ]
    },
    {
        path:'/',
        to:'/login'
    }
]


export default routes;