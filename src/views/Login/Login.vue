<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class={on:loadingSwitch} @click="SwitchText">短信登录</a>
          <a href="javascript:;" :class={on:!loadingSwitch} @click="SwitchCode" >密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="">
          <div :class={on:loadingSwitch} >
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!getRight" class="get_verification" :class={phoneRight:getRight} @click="clickCode">{{ showCode ? '获取验证码 ': `已发送${codeTime}s` }}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class={on:!loadingSwitch}>
            <section>
              <section class="login_message">
                <input type="tel"  placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="switchPwd">
                  <div class="switch_circle" :class="{move_circle:showPwd}"></div>
                  <span class="switch_text">{{ showPwd?'abc':'...' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click="sendLoad">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alert-text="alertText" v-show="alertTips" @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
import AlertTip from "@/components/AlertTip/AlertTip";
import {reqPwdLogin} from "@/api";
import {mapActions} from "vuex";
export default {
  name: "Login",
  data(){
    return{
      loadingSwitch:true,
      phone:'',//手机号码
      code:'',//手机验证码
      showCode:true,//获取验证码/倒计时切换显示
      codeTime:'10',//验证码初始时间
      name:'',//用户名
      pwd:'',//密码
      captcha:'',//图像验证码
      showPwd:false, //显示密码
      alertTips:false,//错误提示显示
      alertText:'',//提示错误文字
      regPhone:/^1[3-9][0-9]{9}$/,//手机号码判断
    }
  },
  methods:{
    ...mapActions(['setUserInfo']),
    SwitchText(){//切换密码登陆
      this.loadingSwitch=true
    },
    SwitchCode(){//切换验证码登陆
      this.loadingSwitch=false
    },
    clickCode(){//获取验证码
      if(this.codeTime === '10'){//判断倒计时不能发送
        this.showCode=false
        const setInterID = setInterval(()=>{
          this.codeTime--
          if(this.codeTime <= 0){
            clearInterval(setInterID)
            this.showCode=true
            this.codeTime = '10'
          }
        },1000)
      }
    },
    switchPwd(){//密码显示切换
      this.showPwd=!this.showPwd
    },
    closeTip(){//关闭提示，从子组件获取的方法，通过@closeTip自定义事件传递
      this.alertTips = false
      this.alertText = 'alertTextMsg'
    },
    showTips(showTip){//提示
      this.alertTips = true
      this.alertText = showTip
    },
    async sendLoad(){//提交登陆
      const {name,pwd,captcha} = this
      let result
      switch (this.loadingSwitch) {
        case true://手机验证码登陆
          if(!this.getRight){
            this.showTips('请输入正确的手机号码')
            return
          }else if(!(this.code.trim().length===8)){
            this.showTips('请输入正确的验证码')
            return;
          }
          break
        case false://账号登陆
          if(!(this.name.trim())){
            this.showTips('请输入正确的号码')
            return;
          }else if(!(this.pwd.trim())){
            this.showTips('请输入正确的密码')
            return;
          }else if (!this.captcha){
            this.showTips('请输入正确验证码')
            return;
          }
          result = await reqPwdLogin({name,pwd,captcha})//提交登陆ajax
          break
      }
      if(result.code===0){//检测数据
        const userInfo = result.data
        this.setUserInfo(userInfo)//设置用户数据
        this.$router.replace('/profile')//跳转页面
        //this.$store.dispatch('setUserInfo', userInfo)
      }else {//错误提示
        this.getCaptcha()
        const msg = result.msg
        this.showTips(msg)
      }
    },
    getCaptcha(){//刷新验证码
      this.$refs.captcha.src = 'http://localhost:3000/captcha?time='+Date.now()
    },
  },
  computed:{
    getRight(){//手机号码位数验证（关联获取验证码点击行为）
      return this.regPhone.test(this.phone)
    },
  },
  components:{
    AlertTip,
  }
}
</script>

<style scoped lang="stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.phoneRight
                color #4cd96f
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.move_circle
                  transform translateX(30px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
