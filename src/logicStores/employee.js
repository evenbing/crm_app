/**
 * @component initState.js
 * @description 全部成员store
 * @time 2018/9/11
 * @author JUSTIN XU
 */
import { action, observable, computed, runInAction, useStrict } from 'mobx';
import autobind from 'autobind-decorator';
import {
  getEmployeeList,
} from '../service/employee';
import Toast from '../utils/toast';
import { formatMemberList } from '../utils/base';

useStrict(true);

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
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.refreshing = false;
      });
    }
  }
}

export default new EmployeeStore();
