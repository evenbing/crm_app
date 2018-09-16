/*
 * @Author: ShiQuan
 * @Date: 2018-09-11 01:10:41
 * @Last Modified by: ShiQuan
 * @Last Modified time: 2018-09-16 08:21:38
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
import { initFlatList } from './initState';

useStrict(true);

@autobind
class SalesChanceStore {
  // 列表
  @observable salesChanceList = initFlatList;

  // 客户详情
  @observable salesChanceDetail = {};

  // 列表
  @action async getSalesChanceListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.salesChanceList.refreshing = true;
      } else {
        this.salesChanceList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await getSalesChanceList({ pageNumber, ...restProps });
      runInAction(() => {
        this.salesChanceList.total = totalCount;
        this.salesChanceList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.salesChanceList.list = [...result];
        } else {
          this.salesChanceList.list = this.salesChanceList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.salesChanceList.refreshing = false;
        this.salesChanceList.loadingMore = false;
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
      } = await getSalesChanceDetail({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesChanceDetail = { ...result };
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
        this.salesChanceDetail = { ...result };
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
        this.salesChanceDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 合并相同项
  @action async mergeSalesChanceReq(options) {
    try {
      const {
        result = {},
      } = await mergeSalesChance(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.salesChanceDetail = { ...result };
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
        this.salesChanceDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new SalesChanceStore();
