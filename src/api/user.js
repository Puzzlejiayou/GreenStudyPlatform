import request from '@/utils/request'

export default {
    //条件查询教师
    getUserListPage(current,limit,userQuery){
        return request({
            url: `/educenter/member/pageUserCondition/${current}/${limit}`,
            method: 'post',
            data:userQuery
          })
    },
    //删除教师
    deleteUserById(id){
        return request({
            url: `/educenter/member/${id}`,
            method: 'delete'
          })
    },
    //添加教师
    addUser(member){
        return request({
            url: `/educenter/member/addUser`,
            method: 'post',
            data: member //RequestBody传输json数据，需要写data
          })
    },
    
    getUserInfo(id){
        return request({
            url: `/educenter/member/getUser/${id}`,
            method: 'get',
          })
    },
    updateUserInfo(member){
        return request({
            url: `/educenter/member/updateUser`,
            method: 'post',
            data: member
          })
    }
}


