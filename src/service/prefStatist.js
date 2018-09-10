/**
 * @component prefStatist.js
 * @description 统计 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';
import { getUserId } from '../utils/base';

/** 销售总额数据统计
 * @add by zhao
 * @params options
 * {
 *   ownerUserId 负责人userId must
 *   dateIdFrom 开始日期Id must 20180821
 *   dateIdTo 结束日期Id must 20180821
 * }
 * @return Promise<Object>
 */
export function getSalesSum({
  ownerUserId = getUserId(),
  dateIdFrom,
  dateIdTo,
} = {}) {
  return post({
    method: 'api.customerrelations.salesSumStatistic.get',
    ownerUserId,
    dateIdFrom,
    dateIdTo,
  });
}


/** 销售趋势
 * @add by zhao
 * @params options
 * {
 *   ownerUserId 负责人userId must
 *   dateIdFrom 开始日期Id must 20180821
 *   dateIdTo 结束日期Id must 20180821
 * }
 * @return Promise<Object>
 */
export function getSalesTrend({
  ownerUserId = getUserId(),
  dateIdFrom,
  dateIdTo,
} = {}) {
  return post({
    method: 'api.customerrelations.salesTrendStatistic.get',
    ownerUserId,
    dateIdFrom,
    dateIdTo,
  });
}

/** 销售漏斗统计图
 * @add by zhao
 * @params options
 * {
 *   ownerUserId 负责人userId must
 *   dateIdFrom 开始日期Id must 20180821
 *   dateIdTo 结束日期Id must 20180821
 * }
 * @return Promise<Object>
 */
export function getSalesEchart({
  ownerUserId = getUserId(),
  dateIdFrom,
  dateIdTo,
} = {}) {
  return post({
    method: 'api.customerrelations.salesStatistic.get',
    ownerUserId,
    dateIdFrom,
    dateIdTo,
  });
}

/** 员工销售排行榜
 * @add by zhao
 * @params options
 * {
 *   dateIdFrom 开始日期Id must 20180821
 *   dateIdTo 结束日期Id must 20180821
 * }
 * @return Promise<ArrayList>
 */
export function getSalesRankingList({
  dateIdFrom,
  dateIdTo,
} = {}) {
  return post({
    method: 'api.customerrelations.salesRankingStatistic.get',
    dateIdFrom,
    dateIdTo,
  });
}

/** 今日工作查询  暂无
 * @add by zhao
 * @params options
 * {
 * }
 * @return Promise<Object>
 */
export function getWorkingToday() {
  return post({
    method: 'api.customerrelations.workingToday.get',
  });
}

/** 工作圈列表查询
 * @add by zhao
 * @params options
 * {
 * ownerUserId 负责人id must
 * }
 * @return Promise<Object>
 */
export function findWorkEventDetail({
  ownerUserId = getUserId(),
} = {}) {
  return post({
    method: 'api.customerrelations.workEventDetail.find',
    ownerUserId,
  });
}

/** 创建埋点接口（创建、跟进事件调用）  暂无
 * @add by zhao
 * @params options
 * {
 * moduleType 模块类型 must
 * moduleId 模块ID must
 * content 事件内容:如创建市场活动“活动名” must
 * }
 * @return Promise<Object>
 */
export function createWorkEvent({
  moduleType,
  moduleId,
  content,
} = {}) {
  return post({
    method: 'api.customerrelations.workEventDetail.create',
    moduleType,
    moduleId,
    content,
  });
}
