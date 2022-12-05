import {reqAddress, reqFoodCategorys, reqLogout, reqShopGoods, reqShopInfo, reqShops, reqUserInfo} from "@/api";
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORY, RECEIVE_SHOPGINFO, RECEIVE_SHOPGOODS,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    REST_USERINFO
} from "@/store/mutations_type";

export default {
    async getAddress({commit,state}){
        const geohash = state.latitude +','+state.longitude
        const result = await reqAddress(geohash)
        if(result.code===0){
            const address = result.data
            commit(RECEIVE_ADDRESS,{address})
        }
    },
    async getCategorys({commit}){
        const result = await reqFoodCategorys()
        if(result.code===0){
            const categorys = result.data
            commit(RECEIVE_CATEGORY, {categorys})
        }
    },
    async getShops({commit,state}){
        const {latitude, longitude} = state
        const result = await reqShops({latitude, longitude})
        if(result.code===0){
            const shops = result.data
            commit(RECEIVE_SHOPS,{shops})
        }
    },
    setUserInfo({commit},userInfo){//保存用户信息到state
        commit(RECEIVE_USERINFO,{userInfo})
    },
    async getuserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code===0){
            const userInfo = result.data
            commit(RECEIVE_USERINFO,{userInfo})
        }
    },
    async logout({commit}){
        const result = await reqLogout()
        if (result.code===0){
            commit(REST_USERINFO)
        }
    },
    async getGoods({commit}){
        const result = await reqShopGoods()
        if (result.code===0){
            const goods = result.data
            commit(RECEIVE_SHOPGOODS,{goods})
        }
    },
    async getInfo({commit}){
        const result = await reqShopInfo()
        if (result.code===0){
            const info = result.data
            commit(RECEIVE_SHOPGINFO,{info})
        }
    },
}
