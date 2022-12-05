<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<style lang="stylus">

</style>
<script>
import FooterGuide from "@/components/FooterGuide";
import {mapActions} from "vuex";

export default {
  components: {
    FooterGuide
  },
  methods:{
    ...mapActions(['getAddress','getuserInfo']),//ES6语法，扩展action对象函数到实例

  },
  mounted() {
    this.getAddress()//获取地理位置函数
    this.getuserInfo()
  },
}
</script>
