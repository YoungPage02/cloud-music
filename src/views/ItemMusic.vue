<template>
  <!-- 点击歌单进入的页面 -->
  <ItemTop :playlist="state.playlist" :creator="state.creator"></ItemTop>
  <lazy-component>
    <ItemList :musicList="state.musicList" :playlist="state.playlist" v-lazy='img'></ItemList>
  </lazy-component>
</template>

<script>
import { useRoute } from 'vue-router'
import { getItemMusic , getMusicList} from '@/request/api/item.js'
import { reactive, onMounted} from 'vue'
import ItemTop from '@/components/item/ItemTop'
import ItemList from '@/components/item/ItemList.vue'
import {useStore} from 'vuex'
export default {
  setup() {
    const state = reactive({
      playlist: {},
      creator: {},
      musicList: []
    })
    const store = useStore()
    const img = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2020-10-28%2F5f99180e8dd5a.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658146540&t=e99215d9d6a182a5082371a9e10390a3'
    onMounted(async () => {
      let id = useRoute().query.id
      // 得到歌单详情页的数据
      let res = await getItemMusic(id)
      // console.log(res,'歌单详情的数据');
      state.playlist = res.data.playlist
      state.creator = res.data.playlist.creator
      // window.sessionStorage.setItem('itemData',JSON.stringify(res.data.playlist))
      // console.log(state.playlist,'palylist的值1');
      // 得到歌曲列表的数据
      let result = await getMusicList(id)
      state.musicList = result.data.songs
      store.commit('changeLoading')
      // console.log(result,'result的数据');
      // console.log(state.musicList,'state.musicList的数据');
    })
    return { state,img }
    // console.log(useRoute(),'useRouter函数的数据');
  },
  components: {
    ItemTop,
    ItemList
  }
}
</script>

<style lang="less" scoped>

</style>