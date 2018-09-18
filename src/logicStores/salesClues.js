/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-11 10:20:55
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-12 14:44:47
 */

import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getSalesClueList,
  createSalesClue,
  getSalesClueDetail,
  updateSalesClue,
  changeOwnerUser,
} from '../service/salesClues';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class SalesClueStore {
  // 列表
  @observable salesClueList = initFlatList;

  // 详情
  @observable salesClueDetail = {};

  // 获取列表
  @action async getSalesClueListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.salesClueList.refreshing = true;
      } else {
        this.salesClueList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getSalesClueList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesClueList.total = totalCount;
        this.salesClueList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.salesClueList.list = [...result];
        } else {
          this.salesClueList.list = this.salesClueList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.salesClueList.refreshing = false;
        this.salesClueList.loadingMore = false;
      });
    }
  }

  // 详情
  @action async getSalesClueReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        result = {},
        errors = [],
      } = await getSalesClue({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesClueDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 新增
  @action async createSalesClueReq(options) {
    try {
      const {
        result = {},
        errors = [],
      } = await createSalesClue(options);
      if (errors.length) throw new Error(errors[0].message);
      debugger;
      runInAction(() => {
        // TODO next
        this.salesClueDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 编辑
  @action async updateSalesClueReq(options) {
    try {
      const {
        result = {},
        errors = [],
      } = await updateSalesClue(options);
      if (errors.length) throw new Error(errors[0].message);
      debugger;
      runInAction(() => {
        // TODO next
        this.salesClueDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 合并相同的客户
  // @action async mergeSalesClueReq(options) {
  //   try {
  //     const {
  //       result = {},
  //     } = await mergeSalesClue(options);
  //     debugger;
  //     runInAction(() => {
  //       // TODO next
  //       this.salesClueDetail = { ...result };
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }

  // 转移负责人
  @action async changeOwnerUserReq(options) {
    try {
      const {
        result = {},
      } = await changeOwnerUser(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.salesClueDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new SalesClueStore();
