import { reqGetSearchInfo } from '@/api'
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    async getSearchList({ commit }, params = {}) {
        const result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)

        }
    }
};
const getters = {
    goodsList(state) {
        //假如没有网，根本就没办法去拿到state的数据，state里是undefined，所以getters没办法遍历undefined，会报错所以加[]
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },

};
export default {
    state,
    mutations,
    actions,
    getters
}