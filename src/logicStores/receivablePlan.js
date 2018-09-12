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
  createReceivablePlan,
} from '../service/receivablePlan';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class ReceivablePlanStore {
  // 列表
  @observable receivablePlanList = initFlatList;
  // @observable contactDetails = {};

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
      } = await getReceivablePlanList({ pageNumber, ...restProps });
      runInAction(() => {
        this.receivablePlanList.total = totalCount;
        this.receivablePlanList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.receivablePlanList.list = [...result];
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
  // @action async getContactDetailsReq({ id }) {
  //   try {
  //     if (!id) throw new Error('id 不为空');
  //     const {
  //       contact = {},
  //     } = await getContactDetails({ id });
  //     runInAction(() => {
  //       this.contactDetails = { ...contact };
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }

  // 新增
  @action async createReceivablePlanReq(options) {
    try {
      const {
        result = {},
      } = await createReceivablePlan(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
  //
  // // 编辑
  // @action async updateContactReq(options) {
  //   try {
  //     const {
  //       result = {},
  //     } = await updateContact(options);
  //     debugger;
  //     runInAction(() => {
  //       // TODO next
  //       this.contactDetails = { ...result };
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }
}

export default new ReceivablePlanStore();
