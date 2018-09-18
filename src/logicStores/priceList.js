/**
 * @component priceList.js
 * @description 价格表
 * @time 2018/9/11
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getPriceDetailList,
  getPriceList,
} from '../service/price';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class PriceListStore {
  // 获取价格表
  @observable priceList = initFlatList;

  // 价格详情列表
  @observable priceProductList = initFlatList;

  // 获取价格表
  @action async getPriceListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.priceList.refreshing = true;
      } else {
        this.priceList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getPriceList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.priceList.total = totalCount;
        this.priceList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.priceList.list = [...result];
        } else {
          this.priceList.list = this.priceList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.priceList.refreshing = false;
        this.priceList.loadingMore = false;
      });
    }
  }

  // 切换是否激活
  // @action async updateFollowPrice({ id }) {
  //   try {
  //     if (!id) throw new Error('id 不为空');
  //     // const {
  //     //   contact = {},
  //     // } = await getContactDetails({ id });
  //     // runInAction(() => {
  //     //   this.contactDetails = { ...contact };
  //     // });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }

  // 查看价格表
  @action async getPriceDetailListReq({ id }) {
    try {
      this.priceProductList = initFlatList;
      const {
        priceProductList = [],
        errors = [],
      } = await getPriceDetailList({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.priceProductList.list = [...priceProductList];
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.priceProductList.refreshing = false;
      });
    }
  }

  // 标准价格表
  // @action async getStandardPriceListReq({ pageNumber = 1, ...restProps } = {}) {
  //   try {
  //     if (pageNumber === 1) {
  //       this.standardPriceList.refreshing = true;
  //     } else {
  //       this.standardPriceList.loadingMore = true;
  //     }
  //     const {
  //       result = [],
  //       totalCount = 0,
  //       errors = [],
  //     } = await getPriceList({ pageNumber, ...restProps });
  //     if (errors.length) throw new Error(errors[0].message);
  //     // debugger;
  //     runInAction(() => {
  //       this.standardPriceList.total = totalCount;
  //       this.standardPriceList.pageNumber = pageNumber;
  //
  //       if (pageNumber === 1) {
  //         this.standardPriceList.list = [...result];
  //       } else {
  //         this.standardPriceList.list = this.standardPriceList.list.concat(result);
  //       }
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   } finally {
  //     runInAction(() => {
  //       this.standardPriceList.refreshing = false;
  //       this.standardPriceList.loadingMore = false;
  //     });
  //   }
  // }

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
  //
  // // 新增
  // @action async createContactReq(options) {
  //   try {
  //     const {
  //       result = {},
  //     } = await createContact(options);
  //     debugger;
  //     runInAction(() => {
  //       this.contactDetails = { ...result };
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }
  //
  // // 编辑
  // @action async updateContactReq(options) {
  //   try {
  //     const {
  //       result = {},
  //     } = await updateContact(options);
  //     debugger;
  //     runInAction(() => {
  //       this.contactDetails = { ...result };
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }
}

export default new PriceListStore();
