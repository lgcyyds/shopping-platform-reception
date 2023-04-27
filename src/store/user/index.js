import { reqGetCode, reqRegister, reqLogin, reqUserInfo, reLogout } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/localstorage'
const state = {
    code: '',
    token: getToken(),
    userData: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    LOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userData) {
        state.userData = userData
    },
    LOGOUT(state){
        state.token=''
        state.userData={}
        removeToken();
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //注册
    async Register({ commit }, user) {
        const result = await reqRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登录
    async Login({ commit }, data) {
        const result = await reqLogin(data)
        if (result.code == 200) {
            commit('LOGIN', result.data.token)
            setToken(result.data.token)

            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 通过登录时在请求头传给服务器Token，来获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
        }
    },
    async Logout({ commit }) {
        const result = await reLogout();
        if(result.code==200){
            commit("LOGOUT");
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}

const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}