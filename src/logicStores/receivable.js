/**
 * @component receivable.js
 * @description 回款模块
 * @time 2018/9/9
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getReceivableIssueList,
  createReceivablePlan,
  createReceivableRecord,
} from '../service/receivable';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class ReceivablePlanStore {
  // 列表
  @observable receivableIssueList = {
    ...initFlatList,
    pactPrice: 0,
    totalPrice: 0,
    receivablePlan: {},
  };

  // 列表
  @action async getReceivableIssueReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.receivableIssueList.refreshing = true;
      } else {
        this.receivableIssueList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        pactPrice,
        total,
        errors = [],
      } = await getReceivableIssueList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.receivableIssueList.total = totalCount;
        this.receivableIssueList.pageNumber = pageNumber;
        this.receivableIssueList.pactPrice = pactPrice;
        this.receivableIssueList.totalPrice = total;

        if (pageNumber === 1) {
          this.receivableIssueList.list = [...result];
        } else {
          this.receivableIssueList.list = this.receivableIssueList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.receivableIssueList.refreshing = false;
        this.receivableIssueList.loadingMore = false;
      });
    }
  }

  // 新增回款计划
  @action async createReceivablePlanReq(options) {
    try {
      const {
        result = {},
        errors = [],
      } = await createReceivablePlan(options);
      if (errors.length) throw new Error(errors[0].message);
      debugger;
      runInAction(() => {
        // TODO next
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
  // 新增回款记录
  @action async createReceivableRecordReq(options) {
    try {
      const {
        result = {},
        errors = [],
      } = await createReceivableRecord(options);
      if (errors.length) throw new Error(errors[0].message);
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

export default new ReceivablePlanStore();
