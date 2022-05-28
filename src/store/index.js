import { createStore } from 'vuex'

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
    playListIndex: 0,
    audioPaused: true,
    lyricDetailShoe: false
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
    }
  },
  actions: {
  },
  modules: {
  }
})
