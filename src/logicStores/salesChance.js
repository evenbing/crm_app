

/*
 * @Author: ShiQuan
 * @Date: 2018-09-11 01:10:41
 * @Last Modified by: ShiQuan
 * @Last Modified time: 2018-09-11 01:17:25
 */

import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getSalesChanceList,
  getSalesChanceDetail,
  createSalesChance,
  updateSalesChance,
  mergeSalesChance,
  changeOwnerUser,
} from '../service/salesChance';
import Toast from '../utils/toast';

useStrict(true);

@autobind
class SalesChanceStore {
  // 列表
  @observable salesChanceList = {
    pageNumber: 1,
    refreshing: false,
    loadingMore: false,
    list: [],
    total: 0,
  };

  // 客户详情
  @observable salesChanceDetails = {};

  // 列表
  @action async getSalesChanceListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.contractList.refreshing = true;
      } else {
        this.contractList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await etSalesChanceList({ pageNumber, ...restProps });
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
  @action async getSalesChanceReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        result = {},
        errors = [],
      } = await getSalesChance({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 新增
  @action async createSalesChanceReq(options) {
    try {
      const {
        result = {},
      } = await createSalesChance(options);
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
  @action async updateSalesChanceReq(options) {
    try {
      const {
        result = {},
      } = await updateSalesChance(options);
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
  @action async mergeSalesChanceReq(options) {
    try {
      const {
        result = {},
      } = await mergeSalesChance(options);
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

export default new ContractStore();
