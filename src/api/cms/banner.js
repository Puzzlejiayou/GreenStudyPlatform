import request from '@/utils/request'

var apipath = '/educms/bannerAdmin'

export default {
    
    //Banner列表
    getBannerList(current,limit,searchObj){
        return request({
            url: `${apipath}/pageBanner/${current}/${limit}`,
            method: 'post',
            data: searchObj
          })
    },
    getBannerInfo(id) {
        return request({
            url: `${apipath}/getBanner/${id}`,
            method: 'get',
          })
    },
    addBannerInfo(info) {
        return request({
            url: `${apipath}/addBanner`,
            method: 'post',
            data: info,
          })
    },
    updateBannerInfo(info) {
        return request({
            url: `${apipath}/updateBanner`,
            method: 'post',
            data: info
          })
    },
    deleteBannerInfo(id){
        return request({
            url: `${apipath}/deleteBanner/${id}`,
            method: 'delete',
          })
    },

}