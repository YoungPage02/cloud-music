import service from '..'
// 得到歌单详情的数据
export function getItemMusic(id) {
  return service({
    url: `/playlist/detail?id=${id}`,
    method: 'GET'
  })
}