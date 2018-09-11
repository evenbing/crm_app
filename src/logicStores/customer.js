/*
 * @Author: ShiQuan
 * @Date: 2018-09-11 01:10:41
 * @Last Modified by: ShiQuan
 * @Last Modified time: 2018-09-12 00:33:21
 */

import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getCustomerList,
  createCustomer,
  updateCustomer,
  getCustomerDetail,
  mergeCustomter,
  changeOwnerUser,
} from '../service/customer';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class CustomerStore {
  // 列表
  @observable customerList = initFlatList;

  // 客户详情
  @observable customerDetails = {};

  // 列表
  @action async getCustomerListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.contractList.refreshing = true;
      } else {
        this.contractList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await getCustomerList({ pageNumber, ...restProps });
      runInAction(() => {
        this.contractList.total = totalCount;
        this.contractList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.contractList.list = [...result];
        } else {
          this.contractList.list = this.contractList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.contractList.refreshing = false;
        this.contractList.loadingMore = false;
      });
    }
  }

  // 详情
  @action async getCustomerDetailReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        result = {},
        errors = [],
      } = await getCustomerDetail({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 新增
  @action async createCustomerReq(options) {
    try {
      const {
        result = {},
      } = await createCustomer(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.contractDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 编辑
  @action async updateCustomerReq(options) {
    try {
      const {
        result = {},
      } = await updateCustomer(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 合并相同的客户
  @action async mergeCustomterReq(options) {
    try {
      const {
        result = {},
      } = await mergeCustomter(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 转移客户负责人
  @action async changeOwnerUserReq(options) {
    try {
      const {
        result = {},
      } = await changeOwnerUser(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new CustomerStore();
