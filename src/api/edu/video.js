import request from '@/utils/request'
export default {

    //添加小节
    addVideo(video) {
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data: video
          })
    },
    //修改小节
    updateVideoInfo(info) {
        return request({
            url: `/eduservice/video/updateVideo`,
            method: 'post',
            data: info
        })
    },

    getVideoInfo(id){
        return request({
            url: `/eduservice/video/getVideo/${id}`,
            method: 'get',
        })
    },
    
    //删除小节
    deleteVideo(id) {
        return request({
            url: '/eduservice/video/'+id,
            method: 'delete'
          })
    },
    //删除视频
    deleteAliyunvod(id) {
        return request({
            url: '/eduvod/video/removeAlyVideo/'+id,
            method: 'delete'
          })
    }
}