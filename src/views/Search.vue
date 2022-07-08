<template>
  <div class="search-music">
    <!-- 搜索栏--Top -->
    <div class="search">
      <!-- 返回按钮 -->
      <div class="backHome" @click="$router.go(-1)">
        <img src="@/assets/my_icons/系统返回.png" alt="">
      </div>
      <!-- 搜索框 -->
      <div class="one">
        <van-icon name="search" size=".4rem"/>
        <div class="input">
          <input type="text" placeholder="  Search" ref="searchRef" v-model="state.searchKey">
        </div>
      </div>
      <!-- 搜索按钮 -->
      <div class="btn" @click="search">搜索</div>
    </div>
    <!-- 广告 -->
    <div class="ad">
      <div class="text">广告</div>
      <img src="https://img1.baidu.com/it/u=2281357677,1397715691&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800" alt="">
    </div>
    <!-- 历史记录栏 -->
    <div class="search-history">
      <div class="top">
        <span>历史记录</span>
        <!-- 删除按钮 -->
        <van-icon name="delete-o" size=".4rem" @click="delHistory"/>
      </div>
      <div class="content">
        <span v-for="(item,i) in state.historyList" :key="item" @click="searchHistory(i)">
          {{ item }}
        </span>
      </div>
    </div>
    <!-- 推荐 -->
    <div class="search-history">
      <div class="top">
        <span>推荐</span>
        <!-- 刷新 -->
        <van-icon name="delete-o" size=".4rem"/>
      </div>
      <div class="content">
        <span v-for="(item,i) in state.recommentList" :key="item" @click="searchRecomment(i)">
          {{ item }}
        </span>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="bottom">
       <MusicList class="bottom" :musicList="state.musicList" :playMusic="playMusic" :Pheight="6.3+'rem'"></MusicList>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { getSearchMusic } from '@/request/api/home'
import MusicList from '@/components/globle/MusicList.vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const searchRef = ref(null)
    const store = useStore()
    const state = reactive({
      historyList: [],
      searchKey: '',
      musicList: [],
      recommentList: ['LOL','野子','恋爱']
    })
    onMounted(() => {
      console.log(searchRef,'searchRef---后');
      if(window.localStorage.getItem('historyKey')) {
        state.historyList = JSON.parse(window.localStorage.getItem('historyKey'))
      }
    })
    // 搜索歌曲
    async function search() {
      state.searchKey = searchRef.value.value
      if(!state.searchKey) return
      state.historyList.unshift(state.searchKey)
      // 去重
      state.historyList = [...new Set(state.historyList)]
      window.localStorage.setItem('historyKey',JSON.stringify(state.historyList))
      let res = await getSearchMusic(state.searchKey)
      state.musicList = res.data.result.songs
      console.log(res.data.result.songs,'state.musicList数据');
    }
    // 删除全部历史记录
    function delHistory() {
      window.localStorage.removeItem('historyKey')
      state.historyList = []
    }
    // 搜索历史记录歌曲
    async function searchHistory(i) {
      let res = await getSearchMusic(state.recommentList[i])
      state.musicList = res.data.result.songs
      console.log(state.musicList,'历史记录歌曲数据');
    }
    // 搜索推荐歌曲
    async function searchRecomment(i) {
      let res = await getSearchMusic(state.historyList[i])
      state.musicList = res.data.result.songs
      console.log(state.musicList,'推荐歌曲数据');
    }
    function playMusic(index) {
      store.commit('addPlayList',state.musicList[index])
      store.commit('updataPlayListIndex',store.state.playList.length -1)
      store.commit('changeAudio',false)
    }
    return {
      searchRef,
      state,
      search,
      delHistory,
      searchHistory,
      playMusic,
      searchRecomment
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="less" scoped>
.search {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 1rem;
  .backHome {
    img {
      width: .4rem;
      height: .4rem;
    }
  }
  .one {
    width: 5rem;
    height: .7rem;
    background-color: #efefef;
    border-radius: 50px;
    display: flex;
    align-items: center;
    .van-icon {
      margin: 0 .2rem;
    }
    .input {
      width: 4.3rem;
      height: .7rem;
      display: flex;
      justify-content: space-around;
      input {
        width: 100%;
        height: 100%;
        border: none;
        background-color: #efefef;
        outline: navajowhite;
        border-radius: 50px;
        padding: 0;
      }
    }
  }
}
.ad {
  width: 95%;
  height: 2rem;
  margin: .1rem auto;
  position: relative;
  .text {
    position: absolute;
    font-size: .2rem;
    top: .1rem;
    left: .2rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.search-history {
  min-height: 1.2rem;
  width: 100%;
  .top {
    display: flex;
    justify-content: space-between;
    padding: .1rem .3rem;
    span {
      font-weight: bold;
    }
  }
  .content {
    padding: 0 .3rem;
    display: flex;
    flex-wrap: wrap;
    span {
      font-size: .25rem;
      margin: .1rem;
      padding: .1rem;
      background-color: #efefef;
      border-radius: 10px;
      display: inline-block;
    }
  }
}
.bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>