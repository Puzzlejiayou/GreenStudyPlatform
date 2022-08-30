import request from '@/utils/request'

export default {
    getOrderList(current,size,searchObject){
        return request({
            url: `/eduorder/order/findAll/${current}/${size}`,
            method: 'post',
            data: searchObject
          })
    }
}