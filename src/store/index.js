import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item.js'
export default createStore({
  state: {
    playList: [
      {
        al: {
          id: 110646,
          name: "The Chopin Collection: The Nocturnes",
          pic: 1419469524716144,
          picUrl: "https://p1.music.126.net/Dvhon4mH7qimTtE7q3omTw==/1419469524716144.jpg"
        },
        id: 1060910
      }
    ],
    playListIndex: 0,  // playlist的下标
    audioPaused: true,  // 暂停按钮的显示
    lyricDetailShoe: false,  // 歌词详情页的显示
    musicLyric: {} //歌词的显示
  },
  getters: {
  },
  mutations: {
    changeAudio(state,value) {
      state.audioPaused = value
    },
    updataPlayList(state,value) {
      state.playList = value
    },
    updataPlayListIndex(state,value) {
      state.playListIndex = value
    },
    changeLyricDetailShoe(state) {
      state.lyricDetailShoe = !state.lyricDetailShoe
    },
    updataMusicLyric(state,value) {
      state.musicLyric = value
    }
  },
  actions: {
    async getMusicLyric_vuex(context,value) {
      let res = await getMusicLyric(value)
      console.log(res,'歌词的数据');
      context.commit('updataMusicLyric',res.data.lrc)
    }
  },
  modules: {
  }
})
