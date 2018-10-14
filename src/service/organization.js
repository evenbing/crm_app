/**
 * @component organization.js
 * @description 部门 service
 * @time 2018/9/14
 * @author JUSTIN XU
 */
import { post } from '../utils/rpc';

/** 查询部门列表
 * @params options
 * {
 *   pageNumber 页码
 *   pageSize 每页数量 0 通用为全部
 * }
 * @return Promise<ArrayList>
 */
export function getOrganizationList({
  pageNumber = 1,
  pageSize = 15,
} = {}) {
  return post({
    method: 'api.master.humanresource.organization.find',
    pageNumber,
    pageSize,
  });
}
