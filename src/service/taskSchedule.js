/**
 * @component team.js
 * @description 管理团队 service
 * @time 2018/8/28
 * @author zhao
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
}) {
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
  needNotice,
  noticeTime,
  longitudeAndLatitude,
  locationInfo,
  isPrivate,
  principal,
  userIds,
}) {
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
  });
}


/** 创建日程或者任务
 * @add by zhao
 * @params options
 * {
 * id 任务或者日程的ID
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
  isPrivate,
  principal,
  userIds,
}) {
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
}) {
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
 * }
 * @return Promise<Object>
 */
export function find({
  principal,
  userId,
  isTodayWork,
  type,
  moduleType,
  moduleId,
  startDateId,
  endDateId,
}) {
  return post({
    method: 'api.customerrelations.taskSchedule.find',
    principal,
    userId,
    isTodayWork,
    type,
    moduleType,
    moduleId,
    startDateId,
    endDateId,
  });
}
