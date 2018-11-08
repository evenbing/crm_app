/*
 * @Author: zhao
 * @Date: 2018-09-14 01:06:51
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-20 16:40:51
 */
import { post } from '../utils/rpc';

/** 删除日程或者任务
 * @add by zhao
 * @params options
 * {
 * id 任务或者日程的ID must
 * }
 * @return Promise<Object>
 */
export function del({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.taskSchedule.delete',
    id,
  });
}

/** 修改日程或者任务
 * @add by zhao
 * @params options
 * {
 * id 任务或者日程的ID must
 * type 日程任务的类型 must
 * name 任务名称，日程内容
 * startTime 开始时间
 * endTime 截止时间 must
 * moduleType 业务类型 must
 * moduleId 业务ID must
 * comment 任务描述，日程备注 500字以内
 * needNotice 是否开启提醒 must
 * noticeTime 提醒时间
 * longitudeAndLatitude 位置信息的经纬度
 * locationInfo 位置信息
 * isPrivate 是否私密 must
 * principal 责任人的ID
 * userIds 参与用户的ID的集合（数组格式）
 * rowVersion 详情接口会返回该字段，更新时，需要上传
 * }
 * @return Promise<Object>
 */
export function update({
  id,
  type,
  name,
  startTime,
  endTime,
  moduleType,
  moduleId,
  comment,
  needNotice = false,
  noticeTime,
  longitudeAndLatitude,
  locationInfo,
  isPrivate = true,
  principal,
  userIds,
  rowVersion,
} = {}) {
  return post({
    method: 'api.customerrelations.taskSchedule.update',
    id,
    type,
    name,
    startTime,
    endTime,
    moduleType,
    moduleId,
    comment,
    needNotice,
    noticeTime,
    longitudeAndLatitude,
    locationInfo,
    isPrivate,
    principal,
    userIds,
    rowVersion,
  });
}

/** 任务延时接口
 * @add by justin
 * @params options
 * {
 *   id 任务或者日程的ID must
 *   delayHours 延时时长（单位：小时）
 * }
 * @return Promise<Object>
 */
export function updateTaskHours({
  id,
  delayHours,
}) {
  return post({
    method: 'api.customerrelations.task.delay',
    id,
    delayHours,
  });
}

/** 任务完成接口
 * @add by justin
 * @params options
 * {
 *   id 任务或者日程的ID must
 * }
 * @return Promise<Object>
 */
export function updateTaskComplete({
  id,
}) {
  return post({
    method: 'api.customerrelations.task.complete',
    id,
  });
}


/** 创建日程或者任务
 * @add by zhao
 * @params options
 * {
 *  type  日程任务的类型  是  任务填“TASK”，日程填“SCHEDULE”
 *  name  任务名称，日程内容  否  100字以内
 *  startTime 开始时间  否  当类型是日程时为必填
 *  endTime 截止时间  是
 *  moduleType  业务类型  是  “CUSTOMER”表示客户，“CONTACT”表示联系人，“ACTIVITY”表示市场活动，“LEADS”表示销售线索，“OPPORTUNITY”表示销售机会
 *  moduleId  业务ID  是
 *  comment 任务描述，日程备注  否  500字以内
 *  needNotice  是否开启提醒  是  true或者false, （甲方回复： 先固定设置为false）
 *  noticeTime  提醒时间  否  该值表示分钟数，表示开始前多少分钟开启提醒
 *  longitudeAndLatitude  位置信息的经纬度  否
 *  locationInfo  位置信息  否  位置信息的文字描述
 *  locationId 地址Id
 *  isPrivate 是否私密  是  true或者false，(甲方回复：默认传1，UI上暂时不做)
 *  principal 责任人的ID  否
 *  userIds 参与用户的ID的集合（数组格式）  否
 * }
 * @return Promise<Object>
 */
export function create({
  id,
  type,
  name,
  startTime,
  endTime,
  moduleType,
  moduleId,
  comment,
  needNotice,
  noticeTime,
  longitudeAndLatitude,
  locationInfo,
  locationId,
  isPrivate,
  principal,
  userIds,
} = {}) {
  return post({
    method: 'api.customerrelations.taskSchedule.create',
    id,
    type,
    name,
    startTime,
    endTime,
    moduleType,
    moduleId,
    comment,
    needNotice,
    noticeTime,
    longitudeAndLatitude,
    locationInfo,
    locationId,
    isPrivate,
    principal,
    userIds,
  });
}

/** 获取任务或者日程信息
 * @add by zhao
 * @params options
 * {
 * id 任务或者日程的ID must
 * }
 * @return Promise<Object>
 */
export function detail({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.taskSchedule.get',
    id,
  });
}


/** 查询日程任务列表
 * @add by zhao
 * @params options
 * {
 * principal 责任人的Id
 * userId 参与用户的Id
 * isTodayWork 是否只查询今日的任务日程
 * type 日程任务的类型
 * moduleType 关联业务类型
 * moduleId 业务ID
 * startDateId 任务日程的开始日期ID yyyyMMdd
 * endDateId 任务日程的结束日期ID  yyyyMMdd
 * 参数为category：ALL-全部，READ-已读，UNREAD-未读，此处传参UNREAD
 * }
 * @return Promise<Object>
 */
export function find({
  pageNumber = 1,
  pageSize = 200,
  principal,
  userId,
  isTodayWork,
  type,
  moduleType,
  moduleId,
  startDateId,
  endDateId,
  category,
} = {}) {
  return post({
    // method: 'api.customerrelations.taskSchedule.find',
    method: 'api.customerrelations.taskScheduleRelatedToMe.find',
    pageNumber,
    pageSize,
    principal,
    userId,
    isTodayWork,
    type,
    moduleType,
    moduleId,
    startDateId,
    endDateId,
    category,
  });
}
