<template>
    <div class="type-nav">
        <div class="container" @mouseleave="leaveIndex" @mouseenter="showSort">
            <h2 class="all">全部商品分类</h2>
            <transition name="sort">
                <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(item, index) in List" :key="item.categoryId"
                            :class="{ cur: currentIndex == index }">
                            <h3 @mouseenter="changIndex(index)">
                                <a :data-categoryName="item.categoryName" :data-category1Id="item.categoryId"
                                    href="javascript:void(0);">{{ item.categoryName }}</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem" v-for="twoItem in item.categoryChild" :key="twoItem.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="twoItem.categoryName"
                                                :data-category2Id="twoItem.categoryId"
                                                href="javascript:void(0);">{{ twoItem.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="threeItem in twoItem.categoryChild" :key="threeItem.categoryId">
                                                <a :data-categoryName="threeItem.categoryName"
                                                    :data-category3Id="threeItem.categoryId" href="javascript:void(0);">{{
                                                        threeItem.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle'
export default {
    name: 'typeNav',
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    mounted() {
        
        if (this.$route.path != '/home') {
            this.show = false
        }
    },
    computed: {
        //     categoryList(){
        //         return this.$store.state.home.categoryList;
        // },
        ...mapState({
            List: state => state.home.categoryList//对象形式
        }),
    },
    methods: {
        //鼠标进去菜单，样式显示
        // changIndex(index){
        //     this.currentIndex=index
        // },

        //节流
        changIndex: throttle(function (index) {
            this.currentIndex = index
        }, 50),
        //鼠标离开菜单样式消失
        leaveIndex() {
            //这个是菜单鼠标样式
            this.currentIndex = -1
            //这个是搜索页鼠标移出菜单时取消菜单显示
            if (this.$route.path != '/home') {
                this.show = false
            }
        },
        //点击菜单跳转到搜索路由
        goSearch() {
            //点击三级菜单，转到搜索页面，并将菜单的名称和所在的级数和id传到搜索路由
            //此处采用事件委派，但是需要只有a标签能够触发事件，所有在a标签上绑定了自定义类名来保存菜单名称和id
            //如果点击的标签有这些类，那么他就是a标签
            let element = event.target;//获取绑定事件的标签的子标签
            //dataset可以获取自定义的属性和属性值（对象形式）
            //用数据解构获取到类名和id
            // console.log(element.dataset);
            
            let { categoryname, category1id, category2id, category3id } = element.dataset
            //如果获取到类名，说明是a标签
            if (categoryname) {
                //整理路由跳转参数
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                //判断是几级菜单的id
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                location.query = query
                if(this.$route.params){
                    location.params=this.$route.params;                    
                }
                this.$router.push(location);
            }



        },
        //这个是搜索页鼠标移入菜单时菜单显示
        showSort() {
            if (this.$route.path != '/home') {
                this.show = true
            }
        }
    }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }
        .sort-enter{
            height: 0px;
            opacity: 0;
        }
        .sort-enter-to{
            height: 461px;
            opacity: 1;
        }
        .sort-enter-active{
            transition: all .5s linear;
            overflow: hidden;
        }
    }
}</style>