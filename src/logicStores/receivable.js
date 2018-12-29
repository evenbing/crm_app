/**
 * @component receivable.js
 * @description 回款模块
 * @time 2018/9/9
 * @author JUSTIN XU
 */
import { action, observable, computed, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import { ToastUtil } from 'xn-react-native-applets';
import {
  getReceivableIssueList,
  createReceivableIssue,
  createReceivablePlan,
  createReceivableRecord,
} from '../service/receivable';
import { initFlatList } from './initState';
import { formatDateByMoment, formatDateType } from '../utils/base';
import { ReceivableDetailType } from '../constants/enum';

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
        invoiceDetail = {},
      } = value;
      const receivableList = [];
      let receivableTotalPrice = 0; // 计划总金额
      let recordTotalPrice = 0; // 记录还款总金额
      let invoiceTotalPrice = 0; // 开票还款总金额
      if (Object.keys(receivablePlan).length) {
        value.hasPlan = true; // 包含计划
        receivableList.push({
          typeName: ReceivableDetailType[0],
          ...receivablePlan,
          formatDateTime: formatDateByMoment(receivablePlan.receivableDate, formatDateType),
          formatPrice: receivablePlan.receivablePrice,
        });
        receivableTotalPrice = (receivablePlan.receivablePrice || 0);
      }
      if (receivableDetailList.length) {
        value.hasRecord = true; // 包含记录
        receivableDetailList.forEach((item) => {
          receivableList.push({
            typeName: ReceivableDetailType[1],
            ...item,
            formatDateTime: formatDateByMoment(item.receivableDate, formatDateType),
            formatPrice: item.receivablePrice,
          });
          recordTotalPrice += (item.receivablePrice || 0);
        });
      }
      if (Object.keys(invoiceDetail).length) {
        value.hasInvoice = true; // 包含开票
        receivableList.push({
          typeName: ReceivableDetailType[2],
          ...invoiceDetail,
          formatDateTime: formatDateByMoment(invoiceDetail.invoiceDate, formatDateType),
          formatPrice: invoiceDetail.price,
        });
        invoiceTotalPrice = (invoiceDetail.price || 0);
      }
      value.receivableList = receivableList;
      value.receivableTotalPrice = receivableTotalPrice;
      value.recordTotalPrice = recordTotalPrice;
      value.invoiceTotalPrice = invoiceTotalPrice;
      value.receivableStatus = (receivableTotalPrice !== 0 && receivableTotalPrice <= recordTotalPrice) ? '已完成' : '未完成';
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
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.receivableIssueList.refreshing = false;
        this.receivableIssueList.loadingMore = false;
      });
    }
  }

  // 新增回款计划
  @action async createReceivableIssueReq({ pactId }) {
    try {
      const {
        errors,
      } = await createReceivableIssue({ pactId });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getReceivableIssueReq({ pactId });
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }

  // 新增回款计划
  @action async createReceivablePlanReq({ pactId, ...restProps }, callback) {
    try {
      const {
        errors = [],
      } = await createReceivablePlan({ pactId, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getReceivableIssueReq({ pactId });
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }

  // 新增回款记录
  @action async createReceivableRecordReq({ pactId, ...restProps }, callback) {
    try {
      const {
        errors = [],
      } = await createReceivableRecord({ pactId, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getReceivableIssueReq({ pactId });
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }
}

export default new ReceivablePlanStore();
