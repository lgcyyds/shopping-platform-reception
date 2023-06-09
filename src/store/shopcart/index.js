import { reqCartList } from '@/api'
import { reqIsChecked } from '@/api'
import { reqDeleteCartList } from '@/api'

const state = {
    cartList: {},
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        const result = await reqCartList()
        console.log(result);

        if (result.code == 200) {
            commit('GETCARTLIST', result.data[0])
        }
    },
    //修改购物车商品的选定状态：打勾和不打勾，注意数据解构要跟组件传值的参数名字一样
    async upDateIsChecked({ commit }, { skuId, isChecked }) {
        let result = await reqIsChecked(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
     //修改所有商品的选定状态
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let promiseAll=[]
        getters.CartInfoList.forEach(item=>{
            let promise = dispatch('upDateIsChecked',{skuId:item.skuId,isChecked:isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },
    //删除购物车的商品
    async deleteCartList({commit},skuId){
        const result=await reqDeleteCartList(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除购物车选中的商品
    deleteAllCheckCart({dispatch,getters}){
        //创建一个promise数组
        let promiseAll=[]
        getters.CartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCartList',item.skuId):''
            //遍历每一个商品的勾选状态，只要是勾选的，就调用删除接口，并将返回的promise对象保存在数组中
            promiseAll.push(promise)
        });
        //返回全部都成功删除的promise对象
        return Promise.all(promiseAll)
    },
   
    
}
const getters = {
    CartInfoList(state) {
        let cartList = state.cartList || {}
        if(cartList=={}){
            return {}
        }
        return cartList.cartInfoList||{}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
