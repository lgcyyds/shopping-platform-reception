<template>
    <div>
        <typeNav />
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <li class="with-x" v-if="SearchListData.categoryName">{{ SearchListData.categoryName }}<i
                                @click="removeCategoryName">×</i></li>
                        <li class="with-x" v-if="SearchListData.keyword">{{ SearchListData.keyword }}<i
                                @click="removeKeyWord">×</i></li>
                        <li class="with-x" v-if="SearchListData.trademark">{{ SearchListData.trademark.split(':')[1] }}<i
                                @click="removeTradeMark">×</i></li>
                        <li class="with-x" v-for="item, index in SearchListData.props" :key="index">{{ item.split(':')[1]
                        }}<i @click="removeAttr(index)">×</i></li>
                    </ul>
                </div>
                <!--selector-->
                <SearchSelector @searchTradeMark="searchTradeMark" @attrInfo="attrInfo" />
                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{active:isOne}" @click="changeOrder(1)">
                                    <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-up':isUp,'icon-down':isDown}"></span></a>
                                </li>
                                <li :class="{active:isTwo}" @click="changeOrder(2)">
                                    <a>销量<span v-show="isTwo" class="iconfont" :class="{'icon-up':isUp,'icon-down':isDown}"></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <a href="item.html" target="_blank">
                                            <router-link :to="`/detail/${item.id}`"><img v-lazy="item.defaultImg" /></router-link>
                                        </a>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥ </em>
                                            <i>{{ item.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html" :title="item.title" v-html="item.title"></a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank"
                                            class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <Pagination :pageNo="SearchListData.pageNo" :pageSize="SearchListData.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
                </div>
                <!--hotsale-->
                <div class="clearfix hot-sale">
                    <h4 class="title">热卖商品</h4>
                    <div class="hot-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_01.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_03.png" />
                                    </div>
                                    <div class="attr">
                                        <em>金属A面，360°翻转，APP下单省300！</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_04.png" />
                                    </div>
                                    <div class="attr">
                                        <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4068.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有20人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_02.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SearchSelector from '@/views/Search/SearchSelector'
import { mapGetters , mapState } from 'vuex';
export default {
    data() {
        return {
            SearchListData: {
                "category1Id": "",
                "category2Id": "",
                "category3Id": "",
                "categoryName": "",
                "keyword": "",
                "order": "1:desc",
                "pageNo": 1,
                "pageSize": 10,
                "props": [],
                "trademark": ""
            }
        }
    },
    components: {
        SearchSelector,
    },
    beforeMount() {
        //这个方法可以将其他对象的值拷贝到目标对象中，也就是在挂载之前将路由的数据存到参数中
        Object.assign(this.SearchListData, this.$route.params, this.$route.query)
        
    },
    mounted() {
        // 挂载后把参数数据通过发送请求传给服务器
        this.getData()
    },
    computed: {
        ...mapGetters(['goodsList', 'attrsList', 'trademarkList']),
        ...mapState({total:state=>state.search.searchList.total}),
        isOne(){
            return this.SearchListData.order.indexOf('1')!=-1
        },
        isTwo(){
            return this.SearchListData.order.indexOf('2')!=-1
        },
        isUp(){
            return this.SearchListData.order.indexOf('asc')!=-1
        },
        isDown(){
            return this.SearchListData.order.indexOf('desc')!=-1
        }
    },
    methods: {
        // 获取或刷新数据
        getData() {
            this.$store.dispatch('getSearchList', this.SearchListData)
            //在更新前，将上一次三级菜单的值置空，这样就不会参数就不会同时出现一二三级菜单
            this.SearchListData.category1Id = undefined
            this.SearchListData.category2Id = undefined
            this.SearchListData.category3Id = undefined
        },
        //删除属性面包屑
        removeCategoryName() {
            //无需使用getData（），因为改变了路由，就被监听到了，自动生成新参数并调用getData（）
            // this.$route.query.categoryName = ''//好像不要这一句也没关系，因为跳转路由不带query就好
            //这一句是为了删掉面包屑
            this.SearchListData.categoryName = undefined
            //保证params参数不会跟着没了
            this.$router.push({ name: 'search', params: this.$route.params })
        },
        //删除面包屑之后，搜索框置空
        removeKeyWord() {
            this.SearchListData.keyword = undefined
            this.$router.push({ name: 'search', query: this.$route.query })
            //搜索框的字也要置空,采用全局事件总线
            this.$bus.$emit("clear")

        },
        // 点击品牌
        searchTradeMark(index) {
            this.SearchListData.trademark = `${index.tmId}:${index.tmName}`
            console.log(this.SearchListData.trademark);
            this.getData() 

        },
        //删除品牌面包屑
        removeTradeMark() {
            this.SearchListData.trademark = undefined
            this.getData()
        },
        // 点击商品属性
        attrInfo(item, value) {
            console.log(item, value);
            // ["2:6.0～6.24英寸:屏幕尺寸"]
            let attr = `${item.attrId}:${value}:${item.attrName}`
            //判断数组中有没有这个属性值，如果有的话就不要在面包屑再次展示了
            if (this.SearchListData.props.indexOf(attr) == -1) {
                this.SearchListData.props.push(attr)
                console.log(this.SearchListData.props);
                this.getData()
            }
        },
        // 删除面包屑
        removeAttr(index) {
            this.SearchListData.props.splice(index, 1)
            console.log(this.SearchListData.props);

            this.getData()
        },
        // 改变排序
        changeOrder(num){            
            if(this.SearchListData.order.indexOf(num)!=-1){
                let upAndDown=this.SearchListData.order.split(":")[1]
                this.SearchListData.order=`${num}:${upAndDown=='desc'?'asc':'desc'}`
                this.getData()   
            }else{
                this.SearchListData.order=`${num}:${this.SearchListData.order.slice(2,)}`
                this.getData()  
            }
        },
        // 翻页
        getPageNo(page){
            this.SearchListData.pageNo=page            
            this.getData()
        },
    },

    watch: {
        //监听路由变化，如果路由发生变化，就更新请求参数（removeCategoryName）
        $route() {
            Object.assign(this.SearchListData, this.$route.params, this.$route.query)
            this.getData()
        }
    }
}
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }



        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            
        }

        .hot-sale {
            margin-bottom: 5px;
            border: 1px solid #ddd;

            .title {
                font-weight: 700;
                font-size: 14px;
                line-height: 21px;
                border-bottom: 1px solid #ddd;
                background: #f1f1f1;
                color: #333;
                margin: 0;
                padding: 5px 0 5px 15px;
            }

            .hot-list {
                padding: 15px;

                ul {
                    display: flex;

                    li {
                        width: 25%;
                        height: 100%;

                        .list-wrap {

                            .p-img,
                            .price,
                            .attr,
                            .commit {
                                padding-left: 15px;
                            }

                            .p-img {
                                img {
                                    max-width: 100%;
                                    vertical-align: middle;
                                    border: 0;
                                }
                            }

                            .attr {
                                width: 85%;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                            }

                            .price {
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .commit {
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>