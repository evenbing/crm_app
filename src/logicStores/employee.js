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

  // 查询团队成员
  @action async getEmployeeListReq(options) {
    try {
      this.employeeList = [];
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
    }
  }
}

export default new EmployeeStore();
