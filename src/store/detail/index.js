import {reqGetGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid'
const state={
    goodsInfo:{},
    UUID_token:getUUID()
}
const mutations={
    GETGOODSINFO(state,data){
        state.goodsInfo=data
    },
    
}
const actions={
    async getGoodsInfo({commit},skuId){
        const goodsInfo= await reqGetGoodsInfo(skuId)
        if(goodsInfo.code==200){
            commit('GETGOODSINFO',goodsInfo.data)
        }
        
    },
    async AddOrUpdateShopCart({commit},{skuId,skuNum}){
        const result= await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.code==200){            
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters={
    categoryView(state){
        return state.goodsInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },

}
export default {
    state,
    mutations,
    actions,
    getters
}
