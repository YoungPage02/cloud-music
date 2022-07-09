<template>
  <div class="user-info">
    <div class="back-home" >
      <div class="left" @click="$router.push('/')">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <div class="right" @click="$router.push('/search')">
        <van-icon name="search" size=".5rem" style="color : black"/>
      </div>
    </div>
    <div class="panel">
      <div class="nick-img">
        <img src="https://img1.baidu.com/it/u=1735003019,4284614493&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500" alt="">
      </div>
      <div class="nick-name">
        Young_Page
      </div>
    </div>
    <div class="panel2">
      <div class="panel-item">
        <img src="@/assets/my_icons/音乐.png" alt="">
        <p>最近播放</p>
      </div>
      <div class="panel-item">
        <img src="@/assets/my_icons/好友.png" alt="">
        <p>我的好友</p>
      </div>
      <div class="panel-item">
        <img src="@/assets/my_icons/云下载.png" alt="">
        <p>云盘</p>
      </div>
      <div class="panel-item">
        <img src="@/assets/my_icons/收藏.png" alt="">
        <p>收藏和赞</p>
      </div>
    </div>
    <div class="panel3">
      <div class="left">
        <img src="@/assets/my_icons/喜欢.png" alt="">
        <p>我喜欢的音乐</p>
      </div>
      <div class="right">
        心动模式
      </div>
    </div>
    <div class="panel4" @click="logout">
      <div>退出登录</div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    // const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    // 退出登录
    function logout() {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('historyKey')
      store.commit('changeIsLogin',false)
      router.push('/login')
    }
    return {
      logout
      // userInfo
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  height: 13.34rem;
  background-color: #efefef;
  .back-home {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .3rem;
    font-size: .35rem;
  }
  .right {

  }
  .panel {
    width: 95%;
    height: 1.5rem;
    margin: .3rem auto;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .nick-img {
      display: flex;
      justify-content: center;
      img {
        width: 20%;
        height: 80%;
        border-radius: 50%;
        position: absolute;
        top: -.6rem;
      }
    }
    .nick-name {
      line-height: 1.5rem;
      font-weight: bold;
    }
  }
  .panel2 {
    width: 95%;
    background-color: white;
    box-sizing: border-box;
    margin: 0 auto;
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    .panel-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: .6rem;
        height: .6rem;
      }
      p {
        margin: 0;
        padding: 0;
        font-size: .2rem;
      }
    }
  }
  .panel3 {
    width: 95%;
    height: 1.4rem;
    background-color: white;
    box-sizing: border-box;
    margin: .4rem auto;
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    .left {
      display: flex;
      align-items: center;
      img {
        width: .8rem;
        height: .8rem;
      }
      p {
        margin: 0 0 0 .3rem;
        padding: 0;
        font-size: .2rem;
      }
    }
    .right {
      border: 1px solid black;
      border-radius: 10px;
      padding: 3px;
    }
  }
  .panel4 {
    width: 95%;
    height: 1rem;
    background-color: white;
    box-sizing: border-box;
    margin: .4rem auto;
    padding: .2rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
}
</style>