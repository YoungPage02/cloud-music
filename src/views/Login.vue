<template>
  <div class="login">
    <img class="bgimg" src="@/assets/loginBg.jpg" alt="">
    <!-- 二维码生成 -->
    <!-- <div class="base">
      <img :src="state.base64" alt="">
    </div> -->
    <!-- 验证码登录 -->
    <van-form @submit="onSubmit">
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
        <van-button round block type="primary" @click="getCode">
          发送验证码
        </van-button>
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <van-form @submit="onSubmit" v-if="false">
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
    </van-form>
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
  // 点击得到验证码
  async function getCode() {
    const {data:res} = await getVerCode(state.phone)
    console.log(res,'验证码');
  }
   return {
     state,
     pattern,
     onSubmit,
     getCode
   }
 }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: pink;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: -1;
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
    }
  }
}
  
</style>