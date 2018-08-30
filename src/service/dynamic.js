/**
 * @component dynamic.js
 * @description 模块动态 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';

/** 高级查询模块动态表
 * @add by zhao
 * @params options
 * {
 *   moduleType 模块类型 must
 *   moduleId 模块ID must
 *   createBy 创建人ID must
 * }
 * @return Promise<Object>
 */
export function find({
  moduleType,
  moduleId,
  createBy,
} = {}) {
  return post({
    method: 'api.customerrelations.dynamic.find',
    moduleType,
    moduleId,
    createBy,
  });
}

/** 创建模块动态
 * @add by zhao
 * @params options
 * {
 *  moduleType 模块类型 must
 *  moduleId 模块ID must
 *  contentType 记录类型 must
 *  content 跟进内容 must
 * }
 * @return Promise<Object>
 */
export function create({
  moduleType,
  moduleId,
  contentType,
  content,
} = {}) {
  return post({
    method: 'api.customerrelations.dynamic.find',
    moduleType,
    moduleId,
    contentType,
    content,
  });
}

