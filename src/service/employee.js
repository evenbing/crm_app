/**
 * @component employee.js
 * @description 全部成员 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';

/** 查询全部成员
 * @param options
 * {
 *  pageNumber 页码
 *  pageSize 每页数量 0 通用为全部
 *  name 模糊查询  是
 *  isOpenUser
 * }
 */
export function getEmployeeList({
  pageSize = 0,
  name,
  isOpenUser = true,
} = {}) {
  return post({
    method: 'api.master.humanresource.employee.find',
    pageSize,
    name,
    isOpenUser,
  });
}
