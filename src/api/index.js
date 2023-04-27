import requests from "./request";
import mockRequests from './ajaxMock'
export const reqCategoryList=()=> requests({url:'/product/getBaseCategoryList', method:'get'});
export const reqGetBannerList=()=> mockRequests({url:'/banner', method:'get'});
export const reqGetFloorList=()=> mockRequests({url:'/floor', method:'get'});
export const reqGetSearchInfo=(params)=>requests({url:'/list',method:'post',data:params});
export const reqGetGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get',data:skuId});
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'})
export const reqIsChecked=(skuID,isChecked)=>requests({url:`/cart/checkCart/${skuID}/${isChecked}`,method:'get'})
export const reqDeleteCartList=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
export const reqRegister=(data)=>requests({url:`/user/passport/register`,method:'post',data:data})
export const reqLogin=(data)=>requests({url:'/user/passport/login',method:'post',data})
export const reqUserInfo=(data)=>requests({url:'/user/passport/auth/getUserInfo',method:'get',data})
export const reLogout=()=>requests({url:'/user/passport/logout',method:'get'})
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'})
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})