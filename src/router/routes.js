
export default[
    {
        path: '/center',
        component: ()=>import('@/views/Center'),
        name:'Center',
        meta: {
            show: true
        },
        children:[
            {
                path:'grouporder',
                component:()=>import('@/views/Center/groupOrder'),
            },
            {
                path:'myorder',
                component:()=>import('@/views/Center/myOrder'),
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: ()=>import('@/views/PaySuccess'),
        name:'PaySuccess',
        meta: {
            show: true
        }
    },
    {
        path: '/pay',
        component: ()=>import('@/views/Pay'),
        name:'Pay',
        meta: {
            show: true
        },
        beforeEnter: (to, from,next) => {
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
          },
    },
    {
        path: '/trade',
        component: ()=>import('@/views/Trade'),
        name:'Trade',
        meta: {
            show: true
        },
        beforeEnter: (to, from,next) => {
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
          },
    },
    {
        path: '/shopcart',
        component: ()=>import('@/views/ShopCart'),
        name:'ShopCart',
        meta: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',
        component: ()=>import('@/views/AddCartSuccess'),
        name:'AddCartSuccess',
        meta: {
            show: true
        }
    },
    {
        path: '/detail/:skuId',
        component:  ()=>import('@/views/Search/Detail'),
        meta: {
            show: true
        }
    },
    {
        path: '/home',
        component: ()=>import('@/views/Home'),
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: ()=>import('@/views/Login'),
        meta: {
            show: true
        }
    },
    {
        path: '/register',
        component: ()=>import('@/views/Register'),
        meta: {
            show: false
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=>import('@/views/Search'),
        meta: {
            show: true
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
]
