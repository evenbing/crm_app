/*
 * @Author: ShiQuan
 * @Date: 2018-09-11 01:10:41
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-12 13:35:17
 */

import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  find,
  createCustomer,
  updateCustomer,
  getCustomerDetail,
  mergeCustomer,
  changeOwnerUser,
} from '../service/customer';
import Toast from '../utils/toast';
import { initFlatList, initDetailMap } from './initState';

useStrict(true);

@autobind
class CustomerStore {
  // 列表
  @observable customerList = initFlatList;

  // 客户详情
  @observable customerDetail = initDetailMap;

  // 列表
  @action async getCustomerListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.customerList.refreshing = true;
      } else {
        this.customerList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await find({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.customerList.total = totalCount;
        this.customerList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.customerList.list = [...result];
        } else {
          this.customerList.list = this.customerList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.customerList.refreshing = false;
        this.customerList.loadingMore = false;
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
        this.customerDetail.map = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 新增
  @action async createCustomerReq(options, callback) {
    try {
      const {
        result = {},
        errors = [],
      } = await createCustomer(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.customerDetail = { ...result };
        callback && callback();
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
        errors = [],
      } = await updateCustomer(options);
      if (errors.length) throw new Error(errors[0].message);
      debugger;
      runInAction(() => {
        // TODO next
        this.customerDetail = { ...result };
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
      } = await mergeCustomer(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.customerDetail = { ...result };
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
        this.customerDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new CustomerStore();
