import { reqCategoryList } from "@/api";
import { reqGetBannerList } from "@/api";
import { reqGetFloorList } from "@/api";

const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
};
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
        state.categoryList.length=16;//多出来一个数据搞掉
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    REQGETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
};
const actions={
    //处理异步，发送请求，如果响应码为200，则接收数据并commit给mutation
    async categoryList({commit}){
        let result= await reqCategoryList();
        // console.log(result);
        if(result.code==200){
            commit('CATEGORYLIST',result.data);
        }
    },
    async getBannerList({commit}){
        let result =  await reqGetBannerList();
        // console.log(result);
        if(result.code==200){
            commit('GETBANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        let result =  await reqGetFloorList();
        // console.log(result);
        if(result.code==200){
            commit('REQGETFLOORLIST',result.data)
        }
    },
};
const getters={

};
export default {
    state,
    mutations,
    actions,
    getters
}