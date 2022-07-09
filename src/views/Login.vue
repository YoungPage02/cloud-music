<template>
  <div class="login">
    <div class="bg"></div>
    <ul class="square">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <ul class="circle">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <!-- 二维码生成 -->
    <!-- <div class="base">
      <img :src="state.base64" alt="">
    </div> -->
    <!-- 验证码登录 -->
    <van-form @submit="onSubmit" v-if="loginType">
      <van-cell-group inset>
        <van-field
          v-model="state.phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' },{ pattern, message: '请输入正确的手机号码' }]"
        />
        <van-field
          v-model="state.code"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '验证码' }]"
        />
      </van-cell-group>
      <div class="btn" style="margin: 16px;">
        <van-button round block type="primary" @click="getCode" v-if="isCode">
          发送验证码
        </van-button>
        <van-button round block type="primary" v-else>
          重新发送{{timer}}秒
        </van-button>
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
        <div class="text" @click="changeLoginType">切换登录方式</div>
      </div>
    </van-form>
    <!-- 手机登录 -->
    <!-- <van-form @submit="onSubmit" v-if="false">
      <van-cell-group inset>
        <van-field
          v-model="state.phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' },{ pattern, message: '请输入正确的手机号码' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form> -->
    <!-- 一键登录 -->
    <div class="oneClickLogin" v-else>
      <van-button round block type="primary" @click="onClickLogin">
        一键登录
      </van-button>
      <div class="text" @click="changeLoginType">切换登录方式</div>
    </div>
  </div>
</template>

<script>
import { reactive,onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { getPhoneLogin, getUserInfo,getBaseKey,getBase64,getVerCode,loginBycode } from '@/request/api/home.js'
import { useRouter } from 'vue-router'
export default {
 setup() {
   const state = reactive({
     phone: '',
     password: '',
     base64: '',
     code: ''
   })
   //  验证码倒计时
   let isCode = ref(true)
   let timer = ref(60)
  //  一键登录方式
   let loginType = ref(false)
   const store = useStore()
   const router = useRouter()
   const pattern = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
   onMounted(async () => {
    // 得到二维码key
    /* const {data: res} = await getBaseKey()
    const key = res.data.unikey */
    // 生成二维码
    /* const {data: result} = await getBase64(key)
    const baseSrc = result.qrurl
    state.base64 = baseSrc
    console.log(result,'result的值'); */
   })
  //  点击登录按钮
  async function onSubmit() {
    const {data: res} = await loginBycode(state)
    // console.log(res,'验证验证码');
    if(res.data) {
      window.localStorage.setItem('token','elaina')
      store.commit('changeIsLogin',true)
      router.push('/userInfo')
    }
    /* const res = await getPhoneLogin(state)
    if(res.data.code == 200) {
      window.localStorage.setItem('token',res.data.token)
      store.commit('changeIsLogin',true)
      得到个人用户信息
      const result = await getUserInfo(res.data.account.id)
      store.commit('getUserInfo',result)
      window.localStorage.setItem('userInfo',JSON.stringify(result))
      console.log(res,'res的数据');
      console.log(result,'result的数据');
      router.push('/userInfo')
    }else {
      Toast.fail('登录失败');
    }
    console.log(state); */
   }
  //  点击一键登录按钮
  function onClickLogin() {
    window.localStorage.setItem('token','elaina')
    store.commit('changeIsLogin',true)
    router.push('/userInfo')
  }
  // 改变登录方式
  function changeLoginType() {
    loginType.value = !loginType.value
  }
  // 点击得到验证码
  async function getCode() {
    const {data:res} = await getVerCode(state.phone)
    console.log(res,'验证码');
    isCode.value = false
    const T = setInterval(() => {
      timer.value --
      if(timer.value <= 0) {
        clearInterval(T)
        isCode.value = true
      }
    },1000)
    console.log(isCode.value);
  }
   return {
     state,
     pattern,
     onSubmit,
     getCode,
     isCode,
     timer,
     loginType,
     onClickLogin,
     changeLoginType
   }
 }
}
</script>

<style lang="less" scoped>
.login {
  .bg {
    height: 100vh;
    background: linear-gradient(#e74c3c,#f1c40f);
  }
  ul li {
    width: 30px;
    height: 30px;
    position: absolute;
    border: 1px solid white;
    list-style: none;
  }
  .square li {
    animation: square 10s linear infinite;
    opacity: 0;
  }
  .square li:nth-child(1) {
    top: 30vh;
    left: 45vw;
    animation-delay: 2s;
  }
  .square li:nth-child(2) {
    top: 10vh;
    left: 84vw;
    animation-delay: 4s;
    background-color: white;
  }
  .square li:nth-child(3) {
    top: 80vh;
    left: 20vw;
    animation-delay: 6s;
  }
  .square li:nth-child(4) {
    top: 70vh;
    left: 80vw;
    animation-delay: 8s;   
  }
  .square li:nth-child(5) {
    top: 20vh;
    left: 15vw;
    background-color: white;
  }
  @keyframes square {
    from {
      opacity: 1;
      transform: scale(1) rotateY(0);
    }
    5% {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale(3) rotateY(1000deg); 
    }
  }
  .circle li {
    bottom: 0px;
    animation: circle 10s linear infinite;
    opacity: 0;
  }
  .circle li:nth-child(1) {
    left: 6vw;
    animation-delay: 1s;
  }
  .circle li:nth-child(2) {
    left: 26vw;
    animation-delay: 7s;
    background-color: white;
  }
  .circle li:nth-child(3) {
    left: 50vw;
    animation-delay: 3s;
  }
  .circle li:nth-child(4) {
    left: 66vw;
    animation-delay: 9s;
    background-color: white;
  }
  .circle li:nth-child(5) {
    left: 86vw;
    animation-delay: 5s;
  }
  @keyframes circle {
    from {
      opacity: 0;
      transform: translateY(0) scale(1) rotate(0);
    }
    5% {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translateY(-90vh) scale(3) rotate(1000deg);
      border-radius: 50%;
    } 
  }
  .van-form {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .btn {
      .van-button {
        margin-bottom: .2rem;
      }
      .text {
        text-align: center;
        margin-top: 12px;
        font-size: .25rem;
        color: #efefef;
      }
    }
  }
  .oneClickLogin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 90%;
    .text {
      text-align: center;
      margin-top: 12px;
      font-size: .25rem;
      color: #efefef;
    }
  }
}
  
</style>