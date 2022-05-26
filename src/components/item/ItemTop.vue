<template>
  <div class="bg">
    <!-- 顶部导航栏 -->
    <div class="topNav">
      <div class="left">
        <van-icon name="arrow-left" size=".4rem" @click="$router.go(-1)"/>
        <span>歌单</span>
      </div>
      <div class="right">
        <van-icon class="search" name="search" size=".4rem"/>
        <van-icon name="wap-nav" size=".4rem"/>
      </div>
    </div>
    <!-- 背景 -->
    <img class="bgimg" :src="playlist.coverImgUrl" alt="">
    <!-- 详情 -->
    <div class="detailInfo">
      <div>
        <img class="detailImg" :src="playlist.coverImgUrl" alt="">
      </div>
      <div class="descripton">
        <p> {{ playlist.name }} </p>
        <p>
          <img :src="playlist.creator.backgroundUrl" alt="">
          <span> {{ playlist.creator.nickname }} </span>
          <van-icon name="arrow" />
        </p>
        <div class="van-multi-ellipsis--l2">
          {{ playlist.description }}
        </div>
      </div>
    </div>
    <!-- 图标 -->
    <!-- <van-tabbar :fixed=false :border=false>
      <van-tabbar-item icon="comment-o">
        {{ playlist.commentCount }}
      </van-tabbar-item>
      <van-tabbar-item icon="share-o">
        {{ playlist.shareCount }}
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o">下载</van-tabbar-item>
      <van-tabbar-item icon="setting-o">多选</van-tabbar-item>
    </van-tabbar> -->
    <div class="iconInfo">
      <div>
        <van-icon name="comment-o" size=".5rem"/>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div>
        <van-icon name="share-o" size=".5rem"/>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div>
        <van-icon name="friends-o" size=".5rem"/>
        <span>下载</span>
      </div>
      <div>
        <van-icon name="setting-o" size=".5rem"/>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
export default {
  props:["playlist"],
  setup(props) {
    /* const state = reactive({
      creator : {}
    }) */
    if(!props.playlist.creator) {
      props.playlist.creator = JSON.parse(window.sessionStorage.getItem('itemData')).creator 
    }
    
    // console.log(state.creator,'creator的值');
    // return {state}
  }
}
</script>

<style lang="less" scoped>
.bg {
  position: fixed;
  top: 0;
  .topNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .3rem;
  .van-icon {
    color: white;
  }
  .left {
    display: flex;
    align-items: center;
    span {
      color: white;
      font-size: .4rem;
      font-weight: bold;
      margin-left: .5rem;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .search {
      margin-right: .5rem;
    }
  }
  }
  .bgimg {
    width: 100%;
    // height: 7rem;
    position: fixed;
    top: 0;
    z-index: -1;
    filter: blur(10px);
  }
  .detailInfo {
    margin: .5rem 0;
    padding: 0 .3rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    color: white;
    // overflow: hidden;
    .detailImg {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: .3rem;
    }
    .descripton {
      margin-left: .3rem;
      img {
        width: .6rem;
        height: .6rem;
        border-radius: 50%;
      }
      p {
        margin: 0;
        padding: 0;
        margin-bottom: .2rem;
      }
      
    }
    .descripton :nth-child(2) {
      display: flex;
      align-items: center;
      span {
        margin-left: .2rem;
      }
    }
    
  }
  .iconInfo {
    display: flex;
    justify-content: space-around;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin-top: .2rem;
      }
    }
  }
}
</style>