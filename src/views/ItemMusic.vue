<template>
  <ItemTop :playlist="state.playlist"></ItemTop>
  <ItemList></ItemList>
</template>

<script>
import { useRoute } from 'vue-router'
import { getItemMusic } from '@/request/api/item.js'
import { reactive, onMounted} from 'vue'
import ItemTop from '@/components/item/ItemTop'
import ItemList from '@/components/item/ItemList.vue'
export default {
  setup() {
    const state = reactive({
      playlist: {}
    })
    onMounted(async () => {
      let id = useRoute().query.id
      let res = await getItemMusic(id)
      state.playlist = res.data.playlist
      window.sessionStorage.setItem('itemData',JSON.stringify(res.data.playlist))
      // console.log(res,'res的值');
      console.log(state.playlist,'palylist的值');
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