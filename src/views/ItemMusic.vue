<template>
  <ItemTop :playlist="state.playlist"></ItemTop>
  <ItemList :musicList="state.musicList" :playlist="state.playlist"></ItemList>
</template>

<script>
import { useRoute } from 'vue-router'
import { getItemMusic , getMusicList} from '@/request/api/item.js'
import { reactive, onMounted} from 'vue'
import ItemTop from '@/components/item/ItemTop'
import ItemList from '@/components/item/ItemList.vue'
export default {
  setup() {
    const state = reactive({
      playlist: {},
      musicList: []
    })
    onMounted(async () => {
      let id = useRoute().query.id
      // 得到歌单详情页的数据
      let res = await getItemMusic(id)
      // console.log(res,'歌单详情的数据');
      state.playlist = res.data.playlist
      window.sessionStorage.setItem('itemData',JSON.stringify(res.data.playlist))
      // console.log(state.playlist,'palylist的值');
      // 得到歌曲列表的数据
      let result = await getMusicList(id)
      state.musicList = result.data.songs
      console.log(result,'result的数据');
      console.log(state.musicList,'state.musicList的数据');
    })
    return { state }
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