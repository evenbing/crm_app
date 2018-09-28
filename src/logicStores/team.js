import { action, observable, computed, runInAction, useStrict } from 'mobx';
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

  @observable search = null;

  @computed get filterTeamList() {
    if (!this.search) return this.teamList;
    return this.teamList.filter(v => v.userName && v.userName.includes(this.search));
  }

  @action updateSearch(value) {
    this.search = value;
  }

  @action updateTeamActive({ item, radio }) {
    this.teamList = this.teamList.map((v) => {
      if (v.id === item.id) {
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
