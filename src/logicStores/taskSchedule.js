/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-06 22:15:31
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-09 21:49:26
 */

import { action, observable, runInAction, useStrict } from 'mobx';
import autobind from 'autobind-decorator';
import {
  find, create, update,
} from '../service/taskSchedule';
import Toast from '../utils/toast';

useStrict(true);

@autobind
class TaskScheduleStore {
  // home task schedule
  @observable taskScheduleList = [];
  constructor() {
    // reaction(() => this.totalCount);
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
