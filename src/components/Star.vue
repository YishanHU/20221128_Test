<template>
  <div class="star " :class="'star-'+size">
    <span class="star-item " v-for="(star, index) in getStarAryy" :class="star" :key="index"></span>
  </div>
</template>

<script>
export default {
  props:{
    score:Number,
    size:Number
},
  name: "star",
  computed:{
    //计算多少星
    getStarAryy(){
      const {score} = this
      let starAryy = []
      let on = Math.floor(score)
      //let name = ['half','off','on']
      for (let i = 0; i < on; i++) {
        starAryy.push("on")
      }
      if(score*10-on*10>5){
        starAryy.push("half")
      }
      while (starAryy.length<5){
        starAryy.push("off")
      }
      return starAryy
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../views/Home/mixins.styl"
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>
