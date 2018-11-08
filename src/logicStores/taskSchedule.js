/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-06 22:15:31
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-10-11 17:54:17
 */

import { action, observable, runInAction, useStrict } from 'mobx';
import autobind from 'autobind-decorator';
import {
  find, create, update, del, updateTaskHours, updateTaskComplete,
} from '../service/taskSchedule';
import { getMessage } from '../service/app';
import Toast from '../utils/toast';
import { initFlatList, initDetailMap } from './initState';

useStrict(true);
@autobind
class TaskScheduleStore {
  // 列表
  @observable taskScheduleList = initFlatList;

  // 详情
  @observable taskSchedule = initDetailMap;

  // 保存list的搜索对象, 提供给新增调取接口使用
  static queryProps = {};

  /**
   * 删除任务或详情
   */
  @action async deleteTaskScheduleRelatedToMeReq(options, callback) {
    try {
      const {
        errors = [],
      } = await del(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getTaskScheduleRelatedToMeReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   * 查询任务或日程
   */
  @action async getTaskScheduleRelatedToMeReq({ pageNumber = 1, ...restProps }) {
    try {
      this.queryProps = restProps;
      if (pageNumber === 1) {
        this.taskScheduleList.refreshing = true;
      } else {
        this.taskScheduleList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await find({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.taskScheduleList.total = totalCount;
        this.taskScheduleList.pageNumber = pageNumber;
        if (pageNumber === 1) {
          this.taskScheduleList.list = [...result];
        } else {
          this.taskScheduleList.list = this.taskScheduleList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.taskScheduleList.refreshing = false;
        this.taskScheduleList.loadingMore = false;
      });
    }
  }

  @observable taskList = initFlatList;
  /**
   * 查询任务或日程
   */
  @action async getTaskRelatedToMeReq({ pageNumber = 1, ...restProps }) {
    try {
      if (pageNumber === 1) {
        this.taskList.refreshing = true;
      } else {
        this.taskList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await find({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.taskList.total = totalCount;
        this.taskList.pageNumber = pageNumber;
        if (pageNumber === 1) {
          this.taskList.list = [...result];
        } else {
          this.taskList.list = this.taskList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.taskList.refreshing = false;
        this.taskList.loadingMore = false;
      });
    }
  }

  @observable scheduleList = initFlatList;
  /**
   * 查询任务或日程
   */
  @action async getScheduleRelatedToMeReq({ pageNumber = 1, ...restProps }) {
    try {
      if (pageNumber === 1) {
        this.scheduleList.refreshing = true;
      } else {
        this.scheduleList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await find({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.scheduleList.total = totalCount;
        this.scheduleList.pageNumber = pageNumber;
        if (pageNumber === 1) {
          this.scheduleList.list = [...result];
        } else {
          this.scheduleList.list = this.scheduleList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.scheduleList.refreshing = false;
        this.scheduleList.loadingMore = false;
      });
    }
  }

  /**
   *  创建 任务或日程
   */
  @action async createTaskScheduleRelatedToMeReq(options, callback) {
    try {
      const {
        errors = [],
      } = await create(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getTaskScheduleRelatedToMeReq(this.queryProps);
        callback && callback();
        Toast.showSuccess(options.successMsg || '创建成功');
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   *  修改 任务或日程 延迟时间
   */
  @action async updateTaskHoursReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateTaskHours(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getTaskScheduleRelatedToMeReq(this.queryProps);
        callback && callback();
        Toast.showSuccess('更新延时成功');
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   *  修改 任务或日程 完成状态
   */
  @action async updateTaskCompleteReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateTaskComplete(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getTaskScheduleRelatedToMeReq(this.queryProps);
        callback && callback();
        Toast.showSuccess('设置完成成功');
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   *  修改 任务或日程
   */
  @action async updateTaskScheduleRelatedToMeReq(options) {
    try {
      const {
        errors = [],
      } = await update(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getTaskScheduleRelatedToMeReq(this.queryProps);
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 消息列表
  @observable messageList = initFlatList;
  @action async getMessageReq({ pageNumber = 1, ...restProps }) {
    try {
      if (pageNumber === 1) {
        this.messageList.refreshing = true;
      } else {
        this.messageList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getMessage({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.messageList.total = totalCount;
        this.messageList.pageNumber = pageNumber;
        if (pageNumber === 1) {
          this.messageList.list = [...result];
        } else {
          this.messageList.list = this.messageList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.messageList.refreshing = false;
        this.messageList.loadingMore = false;
      });
    }
  }
}

export default new TaskScheduleStore();
