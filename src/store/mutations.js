import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORY, RECEIVE_SHOPGINFO, RECEIVE_SHOPGOODS,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    REST_USERINFO
} from "@/store/mutations_type";

export default {
    [RECEIVE_ADDRESS](state,{address}){
        state.address = address
    },
    [RECEIVE_CATEGORY](state,{categorys}){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,{shops}){
        state.shops = shops
    },
    [RECEIVE_USERINFO](state,{userInfo}){
        state.userInfo = userInfo
    },
    [REST_USERINFO](state){
        state.userInfo = {}
    },
    [RECEIVE_SHOPGOODS](state,{goods}){
        state.goods = goods
    },
    [RECEIVE_SHOPGINFO](state,{info}){
        state.info = info
    },
}
