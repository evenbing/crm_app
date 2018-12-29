/**
 * @component initState.js
 * @description 全部成员store
 * @time 2018/9/11
 * @author JUSTIN XU
 */
import { action, observable, computed, runInAction, useStrict } from 'mobx';
import autobind from 'autobind-decorator';
import { ToastUtil } from 'xn-react-native-applets';
import {
  getEmployeeList,
  createTeamUser,
  getManageTeamList,
  getOwnerUserName,
} from '../service/employee';
import { formatMemberList } from '../utils/base';

useStrict(true);

const initManageTeamList = {
  refreshing: false,
  ownerUserList: [],
  teamList: [],
};

@autobind
class EmployeeStore {
  // 列表
  @observable employeeList = [];
  @observable refreshing = false;
  @observable search = null;

  @computed get filterEmployeeList() {
    if (!this.search) return this.employeeList;
    return this.employeeList.filter(v => v.userName && v.userName.includes(this.search));
  }

  @action updateSearch(value) {
    this.search = value;
  }

  @action updateEmployeeActive({ item, radio }) {
    this.employeeList = this.employeeList.map((v) => {
      if (v.id === item.id) {
        v.actived = !v.actived;
      } else if (!radio) { // 单选
        v.actived = false;
      }
      return v;
    });
  }

  // 查询全部成员列表
  @action async getEmployeeListReq(options) {
    try {
      this.refreshing = true;
      const {
        result = [],
        errors = [],
      } = await getEmployeeList(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.employeeList = formatMemberList(result);
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.refreshing = false;
      });
    }
  }

  // 查询业务团队成员
  @observable manageTeamList = initManageTeamList;
  @action async getManageTeamListReq(options) {
    try {
      this.manageTeamList.refreshing = true;
      const {
        user = {},
      } = await getOwnerUserName({ id: options.ownerUserId });
      runInAction(() => {
        this.manageTeamList.ownerUserList = [{
          ...user,
          headImg: user.avatar,
          userName: user.name,
        }];
      });
      const {
        result: teamList = [],
      } = await getManageTeamList(options);
      runInAction(() => {
        this.manageTeamList.teamList = [...teamList];
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.manageTeamList.refreshing = false;
      });
    }
  }

  /**
   *  创建团队成员
   */
  /* eslint-disable class-methods-use-this */
  @action async createTeamUserReq(options, callback) {
    try {
      await createTeamUser(options);
      callback && callback();
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }
}

export default new EmployeeStore();
