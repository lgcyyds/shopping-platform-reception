<template>
  <div>
    <typeNav></typeNav>
    <listContainer></listContainer>
    <recommend></recommend>
    <rank></rank>
    <like></like>
    <floor v-for="item in List" :key="item.id" :List="item"></floor>
    <brand></brand>
  </div>
</template>
<script>
import listContainer  from "./ListContainer";
import recommend from './Recommend'
import rank from './Rank'
import like from './Like'
import floor from './Floor'
import brand from './Brand'
import { mapState } from "vuex";
export default {
  components:{
    listContainer,
    recommend,
    rank,
    like,
    floor,
    brand
  },
  mounted(){
    this.$store.dispatch('getFloorList');
    this.$store.dispatch('getUserInfo');
  },
  computed:{
    ...mapState({List:state=>state.home.floorList})
  },
  updated(){
    // console.log(this.List);
    
  }
}
</script>

<style>

</style>