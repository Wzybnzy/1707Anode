const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/registry',
        name: 'registry',
        component: () => import('@/views/registry/registry.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        children: [
            {
                path: 'list',
                name: 'list',
                meta: {
                    show: true
                },
                component: () => import('@/views/home/list/list.vue'),
                children: [
                    {
                        path: 'file',
                        name: 'file',
                        meta: {
                            show: true
                        },
                        component: () => import('@/views/home/list/file/file.vue')
                    },
                    {
                        path: 'know',
                        name: 'know',
                        meta: {
                            show: true
                        },
                        component: () => import('@/views/home/list/know/know.vue')
                    }
                ]
            },
            {
                path: 'detail',
                name: 'detail',
                meta: {
                    show: false
                },
                component: () => import('@/views/home/detail/detail.vue')
            },
            {
                path: 'search',
                name: 'search',
                meta: {
                    show: false
                },
                component: () => import('@/views/home/search/search.vue')
            },
            {
                path: 'addfile',
                name: 'addfile',
                meta: {
                    show: false
                },
                component: () => import('@/views/home/addfile/addfile.vue')
            },
            {
                path: 'addknow',
                name: 'addknow',
                meta: {
                    show: false
                },
                component: () => import('@/views/home/addknow/addknow.vue')
            }
        ]

    },
    {
        path:'/',
        redirect:'/login'
    }
]



export default routes;