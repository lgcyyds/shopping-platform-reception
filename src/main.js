import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import Banner from '@/components/Banner'
import Pagination from '@/components/Pagination'
import store from '@/store'
import '@/mock/mockServe'
import 'swiper/css/swiper.min.css'
import * as API from '@/api'
import { MessageBox,Button,Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import jiazai from '@/assets/1.gif'
import '@/plugins/validate'
//图片懒加载
Vue.use(VueLazyload, {
  loading: jiazai,
})

Vue.config.productionTip = false
//全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Banner.name, Banner);
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  }
}).$mount('#app')
