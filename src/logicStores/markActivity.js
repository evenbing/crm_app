/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-11 10:26:48
 * @Last Modified by: Edmond.Shi
 * @Add JUSTIN XU 2018-10-8
 * @Last Modified time: 2018-09-11 11:36:39
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getMarkActivityList,
  createMarkActivity,
  getMarkActivityDetail,
  updateMarkActivity,
  changeOwnerUser,
  batchCreateFollow,
} from '../service/markActivity';
import { deleteFollow } from '../service/app';
import Toast from '../utils/toast';
import { initFlatList, initDetailMap } from './initState';
import { find as getTaskScheduleList } from '../service/taskSchedule';
import { ModuleType, SCHEDULE_TYPE, TASK_TYPE } from '../constants/enum';
import { getSalesChanceList } from '../service/salesChance';
import { getSalesClueList } from '../service/salesClues';

useStrict(true);

const initTotal = {
  scheduleTotal: 0,
  taskTotal: 0,
  saleClueTotal: 0,
  saleChanceTotal: 0,
};

@autobind
class MarkActivityStore {
  // 列表
  @observable markActivityList = initFlatList;
  // 详情
  @observable markActivityDetail = initDetailMap;
  // 总计
  @observable markActivityTotal = initTotal;

  // 保存list的搜索对象, 提供给新增调取接口使用
  static queryProps = {};

  // 列表
  @action async getMarkActivityListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      this.queryProps = restProps;
      if (pageNumber === 1) {
        this.markActivityList.refreshing = true;
      } else {
        this.markActivityList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getMarkActivityList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.markActivityList.total = totalCount;
        this.markActivityList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.markActivityList.list = [...result];
        } else {
          this.markActivityList.list = this.markActivityList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.markActivityList.refreshing = false;
        this.markActivityList.loadingMore = false;
      });
    }
  }

  // 详情
  @action async getMarkActivityDetailReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        activity = {},
        errors = [],
      } = await getMarkActivityDetail({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.markActivityDetail.list = [activity];
        this.markActivityDetail.map = activity;
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 总计
  @action async getMarkActivityTotalReq({ id, pageSize = 1 }) {
    try {
      const {
        totalCount: taskTotal = 0,
        errors: taskErrors = [],
      } = await getTaskScheduleList({
        type: TASK_TYPE,
        moduleId: id,
        moduleType: ModuleType.activity,
        pageSize,
      });
      if (taskErrors.length) throw new Error(taskErrors[0].message);
      const {
        totalCount: scheduleTotal = 0,
        errors: scheduleErrors = [],
      } = await getTaskScheduleList({
        type: SCHEDULE_TYPE,
        moduleId: id,
        moduleType: ModuleType.activity,
        pageSize,
      });
      if (scheduleErrors.length) throw new Error(scheduleErrors[0].message);
      const {
        totalCount: saleClueTotal = 0,
        errors: saleClueErrors = [],
      } = await getSalesClueList({ activityId: id, pageSize });
      if (saleClueErrors.length) throw new Error(saleClueErrors[0].message);
      const {
        totalCount: saleChanceTotal = 0,
        errors: saleChanceErrors = [],
      } = await getSalesChanceList({ customerId: id, pageSize });
      if (saleChanceErrors.length) throw new Error(saleChanceErrors[0].message);
      runInAction(() => {
        this.contactTotal = {
          scheduleTotal,
          taskTotal,
          saleClueTotal,
          saleChanceTotal,
        };
      });
    } catch (e) {
      Toast.showError(e.message);
      runInAction(() => {
        this.contactTotal = initTotal;
      });
    }
  }

  // 新增
  @action async createMarkActivityReq(options, callback) {
    try {
      const {
        errors = [],
      } = await createMarkActivity(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getMarkActivityListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

   // 编辑
   @action async updateMarkActivityReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateMarkActivity(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getMarkActivityDetailReq({ id: options.id });
        this.getMarkActivityListReq(this.queryProps);
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
         this.getMarkActivityDetailReq({ id: options.id });
         this.getMarkActivityListReq(this.queryProps);
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
       } else {
         // 执行关注
         const {
           errors = [],
         } = await batchCreateFollow(restProps);
         if (errors.length) throw new Error(errors[0].message);
       }
       runInAction(() => {
         this.getMarkActivityDetailReq({ id: restProps.id });
         this.getMarkActivityListReq(this.queryProps);
         callback && callback();
       });
     } catch (e) {
       Toast.showError(e.message);
     }
   }
}

export default new MarkActivityStore();
