/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-06 22:15:31
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-20 16:26:50
 */

import { action, observable, runInAction, useStrict } from 'mobx';
import autobind from 'autobind-decorator';
import {
  find, create,
} from '../service/team';
import Toast from '../utils/toast';

useStrict(true);

@autobind
class TeamStore {
  // home task schedule

  // 列表
  @observable teamList = [];
  // 详情
  @observable teamDetail = {};

  /**
   * 查询任务或日程
   */
  @action async getTeamListReq(options) {
    try {
      const {
        result = [],
        errors = [],
      } = await find(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.teamList = [...result];
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   *  创建
   */
  @action async createTeamReq() {
    try {
      const {
        result = [],
        errors = [],
      } = await create();
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.teamList = [...result];
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new TeamStore();
