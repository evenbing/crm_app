/**
 * @component prefStatist.js
 * @description 统计 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';
import { getUserId } from '../utils/base';
// import { ModuleType } from '../constants/enum';

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

/** 查询跟进统计列表
 * @add by justin
 * @params options
 * {
 *    moduleType
 * }
 * @return Promise<Object>
 */
export function getFollowUpStatisticList({
  moduleType,
  ownerUserId = getUserId(),
} = {}) {
  return post({
    method: 'api.customerrelations.dynamic.follow.up.statistic',
    moduleType,
    ownerUserId,
  });
}
