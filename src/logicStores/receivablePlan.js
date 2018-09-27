/**
 * @component receivablePlan.js
 * @description 回款计划
 * @time 2018/9/9
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getReceivablePlanList,
  getReceivablePlanDetails,
  updateReceivablePlan,
} from '../service/receivablePlan';
import { updateOwnerUser } from '../service/contract';
import Toast from '../utils/toast';
import { initDetailMap, receivableFlatList } from './initState';

useStrict(true);

@autobind
class ReceivablePlanStore {
  // 列表
  @observable receivablePlanList = receivableFlatList;
  @observable receivablePlanDetails = initDetailMap;

  // 列表
  @action async getReceivablePlanListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.receivablePlanList.refreshing = true;
      } else {
        this.receivablePlanList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        totalFactPrice = 0,
        totalOverTimePrice = 0,
        totalPlanPrice = 0,
        totalPrice = 0,
        totalUnreceivablePrice = 0,
        errors = [],
      } = await getReceivablePlanList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.receivablePlanList.total = totalCount;
        this.receivablePlanList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.receivablePlanList = {
            ...this.receivablePlanList,
            list: result,
            totalFactPrice,
            totalOverTimePrice,
            totalPlanPrice,
            totalPrice,
            totalUnreceivablePrice,
          };
        } else {
          this.receivablePlanList.list = this.receivablePlanList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.receivablePlanList.refreshing = false;
        this.receivablePlanList.loadingMore = false;
      });
    }
  }

  // 详情
  @action async getReceivablePlanDetailsReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      this.receivablePlanDetails.refreshing = true;
      const {
        receivablePlan = {},
        errors = [],
      } = await getReceivablePlanDetails({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.receivablePlanDetails.list = [receivablePlan];
        this.receivablePlanDetails.map = receivablePlan;
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.receivablePlanDetails.refreshing = false;
      });
    }
  }

  // 编辑
  @action async updateReceivablePlanReq(options) {
    try {
      const {
        result = {},
        errors = [],
      } = await updateReceivablePlan(options);
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

  // 转移负责人
  @action async updateOwnerUserReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateOwnerUser(options);
      debugger;
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getReceivablePlanDetailsReq({ id: options.id });
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new ReceivablePlanStore();
