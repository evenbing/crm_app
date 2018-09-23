/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-06 22:15:31
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-20 16:26:50
 */

import { action, observable, runInAction, useStrict } from 'mobx';
import autobind from 'autobind-decorator';
import {
  getTeamList,
  createTeamUser,
} from '../service/team';
import Toast from '../utils/toast';
import { formatMemberList } from '../utils/base';

useStrict(true);

@autobind
class TeamStore {
  // 列表
  @observable teamList = [];
  // 详情
  @observable teamDetail = {};

  @action updateTeamActive({ item, radio }) {
    this.teamList = this.teamList.map((v) => {
      if (v.userName === item.userName) {
        v.actived = !v.actived;
      } else if (!radio) { // 单选
        v.actived = false;
      }
      return v;
    });
  }

  @action clearModuleType() {
    this.moduleType = null;
  }

  // 查询团队成员
  @action async getTeamListReq(options) {
    try {
      this.teamList = [];
      const {
        result = [],
        errors = [],
      } = await getTeamList(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.teamList = formatMemberList(result);
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.teamList.refreshing = false;
      });
    }
  }

  /**
   *  创建团队成员
   */
  @action async createTeamReq(options) {
    try {
      const {
        result = [],
        errors = [],
      } = await createTeamUser(options);
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
