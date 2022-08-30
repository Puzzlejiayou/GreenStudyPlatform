import request from '@/utils/request'

export default {
    //条件查询
    getCommentListPage(current,limit,commentQuery){
        return request({
            url: `/eduservice/comment/pageCommentCondition/${current}/${limit}`,
            method: 'post',
            data:commentQuery
          })
    },
    //删除
    deleteCommentById(id){
        return request({
            url: `/eduservice/comment/${id}`,
            method: 'delete'
          })
    },
    //根据课程ID查询评论
    getCommentListPageByCourseId(current,limit,courseId){
        return request({
            url: `/eduservice/comment/${current}/${limit}`,
            method: 'get',
            params: {courseId}
          })
    },
    
    getCommentInfo(id){
        return request({
            url: `/eduservice/comment/getComment/${id}`,
            method: 'get',
          })
    },
    
    updateComment(comment){
        return request({
            url: `/eduservice/comment/reply`,
            method: 'post',
            data: comment
          })
    }
}


