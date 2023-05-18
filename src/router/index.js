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
    //判断登录了没有
    if(token){
        //如果登录了，那么就不能去登录和注册页面
        if(to.path=='/login'||to.path=='/register'){
            next('/')
        }else{
            //如果登录了，检查有没有从服务器返回的用户信息
            if(name){
                next()
            }else{
                try {
                    // 如果没有，token在请求头那里，只要路由跳转时没有用户信息就会调用
                    await store.dispatch('getUserInfo')                    
                    next()
                } catch (error) {
                    //如果路由跳转时，检查到localstorage没有token，也就是没办法获取用户信息，那就退出登录
                    await store.dispatch('Logout')
                    next('/login')
                }
            }
        }
    }else{
        let toPath=to.path
        // 在跳转提交订单页面、支付页面、已购订单信息页面时如果没有登录
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            // 那就跳到登录页，并把你要去却因为没登陆而去不了的路径保存在路由的query参数中，等登录成功后，就跳回到之前的页面
            //路由传参
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})
export default router
