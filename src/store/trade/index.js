import {reqAddressInfo,reqOrderInfo} from '@/api'
const state={
    userAddress:[],
    OrderInfo:{}
}
const mutations={
    GETADDRESSINFO(state,userAddress){
        state.userAddress=userAddress
    },
    GETORDERINFO(state,OrderInfo){
        state.OrderInfo=OrderInfo
    }
}
const actions={
    async getAddressInfo({commit}){
        const result = await reqAddressInfo()
        if(result.code==200){
            commit('GETADDRESSINFO',result.data)
        }
    },
    async getOrderInfo({commit}){
        const result = await reqOrderInfo()
        if(result.code==200){
            commit('GETORDERINFO',result.data)
        }
    }
}
const getters={

}
export default{
    state,
    mutations,
    actions,
    getters
}