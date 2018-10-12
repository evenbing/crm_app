/*
 * @Author: ShiQuan
 * @Date: 2018-09-11 01:10:41
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-10-11 16:25:44
 */

import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getSalesChanceList,
  getSalesChanceDetail,
  createSalesChance,
  updateSalesChance,
  mergeSalesChance,
  changeOwnerUser,
  findSalesPhase,
} from '../service/salesChance';
import Toast from '../utils/toast';
import { initFlatList, initDetailMap } from './initState';
import { deleteFollow, createFollow } from '../service/app';

useStrict(true);

@autobind
class SalesChanceStore {
  // 列表
  @observable salesChanceList = initFlatList;

  // 销售机会详情
  @observable salesChanceDetail = initDetailMap;

  // 销售阶段列表
  @observable salesPhaseList = initFlatList;

  // 销售阶段详情
  @observable salesPhaseDetail = initDetailMap;

  // 列表
  @action async getSalesChanceListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.salesChanceList.refreshing = true;
      } else {
        this.salesChanceList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getSalesChanceList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesChanceList.total = totalCount;
        this.salesChanceList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.salesChanceList.list = result;
        } else {
          this.salesChanceList.list = this.salesChanceList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.salesChanceList.refreshing = false;
        this.salesChanceList.loadingMore = false;
      });
    }
  }

  // 详情
  @action async getSalesChanceReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        opportunity = {},
        errors = [],
      } = await getSalesChanceDetail({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesChanceDetail.map = opportunity;
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 新增
  @action async createSalesChanceReq(options, callback) {
    try {
      const {
        result = {},
        errors = [],
      } = await createSalesChance(options);
      debugger;
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        // TODO next
        this.salesChanceDetail = { ...result };
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 编辑
  @action async updateSalesChanceReq(options) {
    try {
      const {
        result = {},
        errors = [],
      } = await updateSalesChance(options);
      if (errors.length) throw new Error(errors[0].message);
      debugger;
      runInAction(() => {
        // TODO next
        this.salesChanceDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 合并相同项
  @action async mergeSalesChanceReq(options) {
    try {
      const {
        result = {},
      } = await mergeSalesChance(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.salesChanceDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 转移客户负责人
  @action async changeOwnerUserReq(options) {
    try {
      const {
        result = {},
      } = await changeOwnerUser(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.salesChanceDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 高级查询销售阶段
  @action async findSalesPhaseReq(options) {
    try {
      const {
        result = [],
      } = await findSalesPhase(options);
      // debugger;
      runInAction(() => {
        // TODO next
        this.salesPhaseList.list = result;
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 关注
  @action async updateFollowStatusReq({ follow, followId, ...restProps }, callback) {
    try {
      // 已经关注则删除
      if (follow) {
        const {
          errors = [],
        } = await deleteFollow({ id: followId });
        if (errors.length) throw new Error(errors[0].message);
        Toast.showSuccess('取消关注成功');
      } else {
        // 执行关注
        const {
          errors = [],
        } = await createFollow(restProps);
        if (errors.length) throw new Error(errors[0].message);
        Toast.showSuccess('关注成功');
      }
      runInAction(() => {
        this.getSalesChanceReq({ id: restProps.objectId });
        this.getSalesChanceListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 转移负责人
  @action async updateOwnerUserReq(options, callback) {
    try {
      const {
        errors = [],
      } = await changeOwnerUser(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getSalesChanceReq({ id: options.id });
        this.getSalesChanceListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new SalesChanceStore();
