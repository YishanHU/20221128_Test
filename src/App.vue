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
export default {
  components: {
    FooterGuide
  }
}
</script>
