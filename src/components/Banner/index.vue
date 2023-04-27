<template>
    <div class="swiper-container" id="floor1Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in List" :key="item.id">
                <img :src="item.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
export default {
    name: 'banner',
    props: ['List'],
    watch: {
        List: {
            //不管你有没有变化，一出现马上一次监听
            immediate: true,
            handler(newValue, oldValue) {
                this.$nextTick(() => {
                    var mySwiper = new Swiper('.swiper-container', {
                        loop: true, // 循环模式选项
                        autoplay: {
                            disableOnInteraction: false,
                        },

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                })
            }
        }
    }
}
</script>

<style></style>