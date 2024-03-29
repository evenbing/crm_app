/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-11 10:20:55
 * @Last Modified by: Edmond.Shi
 * @Add JUSTIN XU 2018-10-9
 * @Last Modified time: 2018-10-11 16:58:58
 */

import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import { ToastUtil } from 'xn-react-native-applets';
import {
  getSalesClueList,
  createSalesClue,
  getSalesClueDetail,
  updateSalesClue,
  changeOwnerUser,
} from '../service/salesClues';
import { initDetailMap, initFlatList } from './initState';
import { find as getTaskScheduleList } from '../service/taskSchedule';
import { ModuleType, TASK_SCHEDULE_TYPE, TASK_SCHEDULE_CATEGORY } from '../constants/enum';
import { createLocationId } from '../service/app';

useStrict(true);

const initTotal = {
  scheduleTotal: 0,
  taskTotal: 0,
};

@autobind
class SalesClueStore {
  // 保存list的搜索对象, 提供给新增调取接口使用
  static queryProps = {};

  // 列表
  @observable salesClueList = initFlatList;
  @action async getSalesClueListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      this.queryProps = restProps;
      if (pageNumber === 1) {
        this.salesClueList.refreshing = true;
      } else {
        this.salesClueList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getSalesClueList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesClueList.total = totalCount;
        this.salesClueList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.salesClueList.list = [...result];
        } else {
          this.salesClueList.list = this.salesClueList.list.concat(result);
        }
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.salesClueList.refreshing = false;
        this.salesClueList.loadingMore = false;
      });
    }
  }

  // 详情
  @observable salesClueDetail = initDetailMap;
  @action async getSalesClueDetailReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        leads = {},
        errors = [],
      } = await getSalesClueDetail({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesClueDetail.list = [leads];
        this.salesClueDetail.map = leads;
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }

  // 总计
  @observable salesClueTotal = initTotal;
  @action async getSalesClueTotalReq({ id, pageSize = 1 }) {
    try {
      this.salesClueTotal = initTotal;
      const {
        totalCount: taskTotal = 0,
        errors: taskErrors = [],
      } = await getTaskScheduleList({
        type: TASK_SCHEDULE_TYPE.task,
        moduleId: id,
        moduleType: ModuleType.clues,
        category: TASK_SCHEDULE_CATEGORY.all,
        pageSize,
      });
      if (taskErrors.length) throw new Error(taskErrors[0].message);
      const {
        totalCount: scheduleTotal = 0,
        errors: scheduleErrors = [],
      } = await getTaskScheduleList({
        type: TASK_SCHEDULE_TYPE.schedule,
        moduleId: id,
        moduleType: ModuleType.clues,
        category: TASK_SCHEDULE_CATEGORY.all,
        pageSize,
      });
      if (scheduleErrors.length) throw new Error(scheduleErrors[0].message);
      runInAction(() => {
        this.salesClueTotal = {
          scheduleTotal,
          taskTotal,
        };
      });
    } catch (e) {
      ToastUtil.showError(e.message);
      runInAction(() => {
        this.salesClueTotal = initTotal;
      });
    }
  }

  // 新增
  @action async createSalesClueReq({ locationInfo, ...restProps }, callback) {
    try {
      let locationId = null;
      if (locationInfo) {
        const { location: { id } } = await createLocationId(locationInfo);
        locationId = id;
      }
      const {
        errors = [],
      } = await createSalesClue({ ...restProps, locationId });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getSalesClueListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }

  // 编辑
  @action async updateSalesClueReq({ locationInfo, ...restProps }, callback) {
    try {
      let locationId = null;
      if (locationInfo) {
        const { location: { id } } = await createLocationId(locationInfo);
        locationId = id;
      }
      const {
        errors = [],
      } = await updateSalesClue({ ...restProps, locationId });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getSalesClueDetailReq({ id: restProps.id });
        this.getSalesClueListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
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
        this.getSalesClueDetailReq({ id: options.id });
        this.getSalesClueListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }
}

export default new SalesClueStore();
