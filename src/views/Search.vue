<template>
  <div class="search-music">
    <!-- 搜索栏--Top -->
    <div class="search">
    <!-- 返回按钮 -->
    <div class="backHome" @click="$router.go(-1)">
      <van-icon name="arrow-left" />
      <span>返回</span>
    </div>
    <!-- 搜索框 -->
    <div class="search-music">
      <div class="one">
        <van-icon name="search" size=".4rem"/>
        <input type="text" placeholder="请输入歌曲名称" ref="searchRef" v-model="state.searchKey">
      </div>
      <!-- 搜索按钮 -->
      <div class="tow">
        <button @click="search">搜索</button>
      </div>
    </div>
    
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
    <!-- 歌曲列表 -->
    <MusicList :musicList="state.musicList" :playMusic="playMusic"></MusicList>
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
      musicList: []
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
      let res = await getSearchMusic(state.historyList[i])
      state.musicList = res.data.result.songs
      console.log(state.musicList,'历史记录歌曲数据');
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
      playMusic
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
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  .backHome {
    span {
      margin-left: .1rem;
    }
  }
  .search-music {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .3rem;
    .one {
      width: 3.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: .33rem;
      border: 1px solid black;
      border-radius: .1rem;
      background-color: white;
      input {
        width: 90%;
        border-radius: .1rem;
        background-color: white;
        border: none;
      }
    }
    button {
      border: 1px solid black;
      border-radius: .05rem;
      background-color: #fff;
      margin-left: .1rem;
    }
  }
}
.search-history {
  width: 100%;
  .top {
    display: flex;
    justify-content: space-between;
    padding: .1rem;
    span {
      font-weight: bold;
    }
  }
  .content {
    span {
      margin: .1rem;
      padding: .1rem;
      background-color: rgb(208, 186, 186);
      border-radius: .1rem;
      display: inline-block;
    }
  }
}
</style>