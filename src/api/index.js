import requests from "./request";
import mockRequests from './ajaxMock'
//获取首页的三级菜单
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });
//获取轮播图
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' });
//获取静态假数据
export const reqGetFloorList = () => mockRequests({ url: '/floor', method: 'get' });
//点击三级菜单后将菜单的名字和各级id作为参数来获取search页的数据
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });
//点击搜索页的商品，到商品详情页时获取商品的信息
export const reqGetGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get', data: skuId });
//新增或者更新购物车商品
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
//获取购物车列表
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })
//购物车商品是否选中
export const reqIsChecked = (skuID, isChecked) => requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })
//删除购物车商品
export const reqDeleteCartList = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
//注册时获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
//注册
export const reqRegister = (data) => requests({ url: `/user/passport/register`, method: 'post', data: data })
//登录
export const reqLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data })
//首次登录时，将token给服务器，然后返回对应用户信息
export const reqUserInfo = (data) => requests({ url: '/user/passport/auth/getUserInfo', method: 'get', data })
//登出
export const reLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
//获取订单的地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
//获取订单的商品信息
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
//提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })
//获取订单的支付信息（二维码url）
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
//检查支付状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
//获取已支付的订单的分页信息（也就是我的订单）
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })