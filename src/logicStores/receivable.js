/**
 * @component receivable.js
 * @description 回款模块
 * @time 2018/9/9
 * @author JUSTIN XU
 */
import { action, observable, computed, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getReceivableIssueList,
  createReceivableIssue,
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
  };

  @computed get getIssueList() {
    const { list = [] } = this.receivableIssueList;
    if (!list.length) return list;
    return list.map((value) => {
      const {
        receivableDetailList = [],
        receivablePlan = {},
      } = value;
      const receivableList = [];
      let receivablePrice = 0; // 计划总金额
      let recordTotal = 0; // 记录还款总金额
      if (Object.keys(receivablePlan).length) {
        receivableList.push({
          typeName: '计划',
          ...receivablePlan,
        });
        value.hasPlan = true; // 包含计划
        receivablePrice = (receivablePlan.receivablePrice || 0);
      }
      if (receivableDetailList.length) {
        receivableDetailList.forEach((item) => {
          receivableList.push({
            typeName: '记录',
            ...item,
          });
          recordTotal += (item.receivablePrice || 0);
        });
      }
      value.receivableList = receivableList;
      value.receivableStatus = (receivablePrice !== 0 && receivablePrice <= recordTotal) ? '已完成' : '未完成';
      return value;
    });
  }

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
  @action async createReceivablePlanReq({ pactId, ...restProps }, callback) {
    try {
      const {
        id: issueId,
        errors: issueError = [],
      } = await createReceivableIssue({ pactId });
      if (issueError.length) throw new Error(issueError[0].message);
      const {
        errors: planError = [],
      } = await createReceivablePlan({ pactId, issueId, ...restProps });
      if (planError.length) throw new Error(planError[0].message);
      runInAction(() => {
        this.getReceivableIssueReq({ pactId });
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
  // 新增回款记录
  @action async createReceivableRecordReq({ pactId, ...restProps }, callback) {
    try {
      const {
        id: issueId,
        errors: issueError = [],
      } = await createReceivableIssue({ pactId });
      if (issueError.length) throw new Error(issueError[0].message);
      const {
        errors: recordError = [],
      } = await createReceivableRecord({ pactId, issueId, ...restProps });
      if (recordError.length) throw new Error(recordError[0].message);
      debugger;
      runInAction(() => {
        this.getReceivableIssueReq({ pactId });
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new ReceivablePlanStore();
