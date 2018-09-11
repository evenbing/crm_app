/*
 * @Author: Edmond.Shi 
 * @Date: 2018-09-11 10:20:55 
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-11 10:26:55
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

useStrict(true);

@autobind
class SalesClueStore {
  // 列表
  @observable salesClueList = {
    pageNumber: 1,
    refreshing: false,
    loadingMore: false,
    list: [],
    total: 0,
  };

  // 详情
  @observable salesClueDetails = {};

  // 获取列表
  @action async getSalesClueListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.contractList.refreshing = true;
      } else {
        this.contractList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await getSalesClueList({ pageNumber, ...restProps });
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
  @action async getSalesClueReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        result = {},
        errors = [],
      } = await getSalesClue({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.contactDetails = { ...result };
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
      } = await createSalesClue(options);
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
  @action async updateSalesClueReq(options) {
    try {
      const {
        result = {},
      } = await updateSalesClue(options);
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
  // @action async mergeSalesClueReq(options) {
  //   try {
  //     const {
  //       result = {},
  //     } = await mergeSalesClue(options);
  //     debugger;
  //     runInAction(() => {
  //       // TODO next
  //       this.contactDetails = { ...result };
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
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new ContractStore();
