import service from '..'
// 得到歌单详情的数据
export function getItemMusic(id) {
  return service({
    url: `/playlist/detail?id=${id}`,
    method: 'GET'
  })
}
// 得到歌曲列表的数据
export function getMusicList(id) {
  return service({
    url: `/playlist/track/all?id=${id}&limit=20&offset=1`,
    method: 'GET'
  })
}
//得到歌词的详细数据,/lyric?id=33894312
export function getMusicLyric(id) {
  return service({
    url: `/lyric?id=${id}`,
    method: 'GET'
  })
}