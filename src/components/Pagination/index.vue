<template>
    <div class="pagination">
        <!-- 上 -->
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="pageNo > 3" @click="$emit('getPageNo',1)">1</button>
        <button v-if="pageNo - 1 > 3">···</button>

        <!-- 中 -->
        <button :class="{active:item==pageNo}" v-for="item, index in startNumAndEndNum.end" :key="index" v-show="item > startNumAndEndNum.end - continues" @click="$emit('getPageNo',item)">{{item }}</button>
            
        <!-- 下 -->
        <button v-if="startNumAndEndNum.end + 1 < totalPage">···</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
        <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共{{ total }}条</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        startNumAndEndNum() {
            let { pageNo, continues, totalPage } = this
            let start = 0
            let end = 0
            if (continues > totalPage) {
                start = 1
                end = totalPage
            } else {
                start = parseInt(pageNo - (continues / 2))
                end = parseInt(pageNo + (continues / 2))
                if (start < 1) {
                    start = 1
                    end = continues
                }
                if (end > totalPage) {
                    end = totalPage
                    start = totalPage - continues + 1
                }
            }
            return { start, end }
        }
    },
}

</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>