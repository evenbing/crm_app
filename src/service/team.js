/**
 * @component team.js
 * @description 管理团队 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';

/** 创建管理团队
 * @add by zhao
 * @params options
 * {
 *   userId 用户ID must
 *   userName userName must
 *   moduleId moduleId must
 *   moduleType moduleType must
 * }
 * @return Promise<Object>
 */
export function create({
  userId,
  userName,
  moduleId,
  moduleType,
}) {
  return post({
    method: 'api.customerrelations.managementTeam.create',
    userId,
    userName,
    moduleId,
    moduleType,
  });
}

