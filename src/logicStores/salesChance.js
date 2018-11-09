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
  changeOwnerUser,
  findSalesPhase,
} from '../service/salesChance';
import Toast from '../utils/toast';
import { initFlatList, initDetailMap } from './initState';
import { deleteFollow, createFollow } from '../service/app';
import { find as getTaskScheduleList } from '../service/taskSchedule';
import { ModuleType, SCHEDULE_TYPE, TASK_TYPE } from '../constants/enum';
import { getContactList } from '../service/contacts';
import { getContractList } from '../service/contract';
import { find as getProductBusinessList } from '../service/business';

useStrict(true);

const initTotal = {
  scheduleTotal: 0,
  taskTotal: 0,
  contactTotal: 0,
  productTotal: 0,
  pactTotal: 0,
};

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
  // 统计
  @observable salesClueTotal = initTotal;

  // 保存list的搜索对象, 提供给新增调取接口使用
  static queryProps = {};

  // 列表
  @action async getSalesChanceListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      this.queryProps = restProps;
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
  @action async getSalesChanceDetailReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        opportunity = {},
        errors = [],
      } = await getSalesChanceDetail({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesChanceDetail.list = [opportunity];
        this.salesChanceDetail.map = opportunity;
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 总计
  @action async getSalesChanceTotalReq({ id, pageSize = 1 }) {
    try {
      this.salesClueTotal = initTotal;
      const {
        totalCount: taskTotal = 0,
        errors: taskErrors = [],
      } = await getTaskScheduleList({
        type: TASK_TYPE,
        moduleId: id,
        moduleType: ModuleType.opportunity,
        pageSize,
      });
      if (taskErrors.length) throw new Error(taskErrors[0].message);
      const {
        totalCount: scheduleTotal = 0,
        errors: scheduleErrors = [],
      } = await getTaskScheduleList({
        type: SCHEDULE_TYPE,
        moduleId: id,
        moduleType: ModuleType.opportunity,
        pageSize,
      });
      if (scheduleErrors.length) throw new Error(scheduleErrors[0].message);
      const {
        totalCount: contactTotal = 0,
        errors: contactErrors = [],
      } = await getContactList({ opportunityId: id, pageSize });
      if (contactErrors.length) throw new Error(contactErrors[0].message);
      const {
        totalCount: productTotal = 0,
        errors: productErrors = [],
      } = await getProductBusinessList({ opportunityId: id, pageSize });
      if (productErrors.length) throw new Error(productErrors[0].message);
      const {
        totalCount: pactTotal = 0,
        errors: pactErrors = [],
      } = await getContractList({ opportunityId: id, pageSize });
      if (pactErrors.length) throw new Error(pactErrors[0].message);
      runInAction(() => {
        this.salesClueTotal = {
          scheduleTotal,
          taskTotal,
          contactTotal,
          productTotal,
          pactTotal,
        };
      });
    } catch (e) {
      Toast.showError(e.message);
      runInAction(() => {
        this.salesClueTotal = initTotal;
      });
    }
  }

  // 新增
  @action async createSalesChanceReq(options, callback) {
    try {
      const {
        errors = [],
      } = await createSalesChance(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getSalesChanceListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 更新
  @action async updateSalesChanceReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateSalesChance(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getSalesChanceDetailReq({ id: options.id });
        this.getSalesChanceListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 转移客户负责人
  @action async updateOwnerUserReq(options, callback) {
    try {
      const {
        errors = [],
      } = await changeOwnerUser(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getSalesChanceDetailReq({ id: options.id });
        this.getSalesChanceListReq(this.queryProps);
        callback && callback();
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
        this.getSalesChanceDetailReq({ id: restProps.objectId });
        this.getSalesChanceListReq(this.queryProps);
        callback && callback();
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
}

export default new SalesChanceStore();
