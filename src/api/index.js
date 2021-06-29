import request from '@/utils/request'
import taskModuleRequest from '@/utils/taskModuleRequest'
//登录
export function auth(data){
    return request({
      url: '/permission/auth',
      method: 'post',
			data
    })
  }

//---------------------------------分组管理---------------------------------------------
//分组管理  获取分组
export function deviceGroups(data){
    return request({
      url: '/groups?page=' + data.page + '&size=' + data.rows,
      method: 'get',
    })
  }
	
//分组管理  添加分组
export function addDeviceGroups(data){
    return request({
      url: '/groups',
      method: 'post',
			data
    })
  }
	
	//分组管理  修改分组
	export function updataDeviceGroups(data){
	    return request({
	      url: '/groups/' + data.groupId,
	      method: 'post',
				data
	    })
	  }
		
//分组管理  删除分组
export function delGroup(data){
    return request({
      url: '/groups',
      method: 'delete',
			data
    })
  }
	
//分组管理  设备添加到分组
export function add2Groups(data){
    return request({
      url: '/devices/to_group',
      method: 'post',
			data
    })
  }
//---------------------------------设备管理---------------------------------------------
//设备管理  设备
export function vDeviceses(data){
    return request({
      url: '/devices?' + (data.groupName?('groupName=' + data.groupName + '&'):'') + (data.identifiers?('identifiers=' + data.identifiers+ '&'):'') + 'page=' + data.page + '&size=' + data.rows,
      method: 'get'
    })
  }



//---------------------------------任务模板---------------------------------------------
//任务模板  
export function taskTemplates(data){
    return request({
      url: '/tasks/template?' + (data.name?('name=' + data.name+ '&'):'') + 'page=' + data.page + '&size=' + data.rows,
      method: 'get'
    })
  }
	
	//任务模板  添加模板
	export function addTaskTemplates(data){
	    return taskModuleRequest({
	      url: '/tasks/template/injury',
	      method: 'post',
				data
	    })
	  }
	
	//任务模板  修改模板
	export function updataTaskTemplates(id,data){
	    return taskModuleRequest({
	      url: '/tasks/template/' + id,
	      method: 'post',
				data
	    })
	  }


//任务模板  删除模板
	export function delTaskTemplates(id){
	    return request({
	      url: '/taskTemplates/'+id,
	      method: 'delete'
	    })
	  }

			//任务模板  创建任务  
				export function createTask(data){
				    return request({
				      url: '/tasks',
				      method: 'post',
							data
				    })
				  }


//---------------------------------任务日志---------------------------------------------
//任务日志  
export function viewTaskLogs(data){
    return request({
      url: '/tasks?' + (data.identifiers?('identifiers=' + data.identifiers+ '&'):'') + 'page=' + data.page + '&size=' + data.rows,
      method: 'get'
    })
  }