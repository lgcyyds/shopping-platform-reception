import vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes'
import store from '@/store'
vue.use(VueRouter);

// 重写push和replace方法（多次传参报错，不重写也无影响）
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
let router= new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {y:0}
      }
})
 router.beforeEach(async (to,from,next)=>{
    const token = store.state.user.token
    const name = store.state.user.userData.name
    if(token){
        if(to.path=='/login'||to.path=='/register'){
            next('/')
        }else{
            if(name){
                next()
            }else{
                try {
                    await store.dispatch('getUserInfo')                    
                    next()
                } catch (error) {
                    await store.dispatch('Logout')
                    next('/login')
                }
            }
        }
    }else{
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            //路由传参
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})
export default router
