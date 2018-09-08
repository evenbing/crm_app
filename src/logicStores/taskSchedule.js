/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-06 22:15:31
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-06 22:27:30
 */

import { action, reaction, observable, runInAction, useStrict } from 'mobx';
import autobind from 'autobind-decorator';
import {
  find,
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
  findTaskScheduleRelatedToMe
  @action async getTaskScheduleRelatedToMeReq() {
    try {
      const {
        result = [],
      } = await find();
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
