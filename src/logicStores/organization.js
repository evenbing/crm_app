/**
 * @component organization.js
 * @description 部门
 * @time 2018/9/14
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getOrganizationList,
} from '../service/organization';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class OrganizationStore {
  @observable organizationList = initFlatList;

  @action async getOrganizationListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.organizationList.refreshing = true;
      } else {
        this.organizationList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getOrganizationList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.organizationList.total = totalCount;
        this.organizationList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.organizationList.list = [...result];
        } else {
          this.organizationList.list = this.organizationList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.organizationList.refreshing = false;
        this.organizationList.loadingMore = false;
      });
    }
  }
}

export default new OrganizationStore();
