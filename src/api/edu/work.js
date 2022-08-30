import request from '@/utils/request'

export default {
    //条件查询作业
    getWorkListPage(current,limit,workQuery){
        return request({
            url: `/eduservice/work/pageWorkCondition/${current}/${limit}`,
            method: 'post',
            data:workQuery
          })
    },
    //删除教师
    deleteWorkById(id){
        return request({
            url: `/eduservice/work/${id}`,
            method: 'delete'
          })
    },
    //添加教师
    addWork(work){
        return request({
            url: `/eduservice/work/addWork`,
            method: 'post',
            data: work //RequestBody传输json数据，需要写data
          })
    },
    
    getWorkInfo(id){
        return request({
            url: `/eduservice/work/getWork/${id}`,
            method: 'get',
          })
    },
    updateWorkInfo(work){
        return request({
            url: `/eduservice/work/updateWork`,
            method: 'post',
            data: work
          })
    },
    getCourseInfo(){
        return request({
            url: `/eduservice/work/findAllCourseInfo`,
            method: 'get',
          })
    },
    
}


