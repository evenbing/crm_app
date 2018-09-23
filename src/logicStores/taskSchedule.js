/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-06 22:15:31
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-20 16:14:15
 */

import { action, observable, runInAction, useStrict } from 'mobx';
import autobind from 'autobind-decorator';
import {
  find, create, update, del,
} from '../service/taskSchedule';
import Toast from '../utils/toast';

useStrict(true);

@autobind
class TaskScheduleStore {
  // 列表
  @observable taskScheduleList = [];

  // 详情
  @observable taskSchedule = {};

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
        this.taskScheduleList = [];
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   * 查询任务或日程
   */
  @action async getTaskScheduleRelatedToMeReq(options) {
    try {
      const {
        result = [],
        errors = [],
      } = await find(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        // console.log({ result });
        this.taskScheduleList = [...result];
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   *  创建 任务或日程
   */
  @action async createTaskScheduleRelatedToMeReq() {
    try {
      const {
        result = [],
        errors = [],
      } = await create();
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        console.log({ result });

        this.taskScheduleList = [...result];
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   *  修改 任务或日程
   */
  @action async updateTaskScheduleRelatedToMeReq() {
    try {
      const {
        result = [],
        errors = [],
      } = await update();
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        console.log({ result });

        this.taskScheduleList = [...result];
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new TaskScheduleStore();
