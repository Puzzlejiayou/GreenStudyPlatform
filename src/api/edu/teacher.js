import request from '@/utils/request'

export default {
    //条件查询教师
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            data:teacherQuery
          })
    },
    //删除教师
    deleteTeacherById(id){
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
          })
    },
    //添加教师
    addTeacher(teacher){
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher //RequestBody传输json数据，需要写data
          })
    },
    
    getTeacherInfo(id){
        return request({
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get',
          })
    },
    updateTeacherInfo(teacher){
        return request({
            url: `/eduservice/teacher/updateTeacher`,
            method: 'post',
            data: teacher
          })
    }
}


