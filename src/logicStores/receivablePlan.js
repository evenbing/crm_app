/**
 * @component receivablePlan.js
 * @description 回款计划
 * @time 2018/9/9
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import { ToastUtil } from 'xn-react-native-applets';
import {
  getReceivablePlanList,
  getReceivablePlanDetails,
  updateReceivablePlan,
} from '../service/receivablePlan';
import { initDetailMap, receivableFlatList } from './initState';
import { getAttachmentList } from '../service/attachment';
import { getAppModuleType } from '../utils/base';

useStrict(true);

const initTotal = {
  attaTotal: 0,
};

@autobind
class ReceivablePlanStore {
  // 保存list的搜索对象, 提供给新增调取接口使用
  static queryProps = {};

  // 列表
  @observable receivablePlanList = receivableFlatList;
  @action async getReceivablePlanListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      this.queryProps = restProps;
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
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.receivablePlanList.refreshing = false;
        this.receivablePlanList.loadingMore = false;
      });
    }
  }

  // 详情
  @observable receivablePlanDetails = initDetailMap;
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
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.receivablePlanDetails.refreshing = false;
      });
    }
  }

  // 总计
  @observable receivablePlanTotal = initTotal;
  @action async getReceivablePlanTotalReq({ id, moduleType, pageSize = 1 }) {
    try {
      this.receivablePlanTotal = initTotal;
      const {
        attachmentList = [],
        errors: attaErrors = [],
      } = await getAttachmentList({
        businessType: getAppModuleType(moduleType),
        businessId: id,
        pageSize,
      });
      if (attaErrors.length) throw new Error(attaErrors[0].message);
      runInAction(() => {
        this.receivablePlanTotal = {
          attaTotal: attachmentList.length,
        };
      });
    } catch (e) {
      ToastUtil.showError(e.message);
      runInAction(() => {
        this.receivablePlanTotal = initTotal;
      });
    }
  }

  // 编辑
  @action async updateReceivablePlanReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateReceivablePlan(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getReceivablePlanDetailsReq({ id: options.id });
        this.getReceivablePlanListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }
}

export default new ReceivablePlanStore();
