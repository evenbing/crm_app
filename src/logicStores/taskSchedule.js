/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-06 22:15:31
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-10-10 17:09:17
 */

import { action, observable, runInAction, useStrict } from 'mobx';
import autobind from 'autobind-decorator';
import {
  find, create, update, del,
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
        this.taskScheduleList.list = [];
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   * 查询任务或日程
   */
  @action async getTaskScheduleRelatedToMeReq(pageNumber = 1, restProps) {
    try {
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

  /**
   *  创建 任务或日程
   */
  @action async createTaskScheduleRelatedToMeReq(options, callback) {
    try {
      const {
        result = [],
        errors = [],
      } = await create(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.taskSchedule.map = [...result];
        callback && callback();
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
        result = null,
        errors = [],
      } = await update(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.taskSchedule.map = result;
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 消息列表
  @observable messageList = initFlatList;
  @action async getMessageReq() {
    try {
      const {
        result = [],
        errors = [],
      } = await getMessage();
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.messageList.list = result;
      });
    } catch (error) {
      Toast.showError(error.message);
    }
  }
}

export default new TaskScheduleStore();
