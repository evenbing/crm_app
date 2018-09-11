/**
 * @component priceList.js
 * @description 价格表
 * @time 2018/9/11
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/lib/mobx';
import autobind from 'autobind-decorator';
import {
  getPriceList,
} from '../service/price';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class PriceListStore {
  // 价格列表
  @observable internalPriceList = initFlatList;
  @observable standardPriceList = initFlatList;
  // @observable contactDetails = {};

  // 内部价格表
  @action async getInternalPriceListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.internalPriceList.refreshing = true;
      } else {
        this.internalPriceList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await getPriceList({ pageNumber, ...restProps });
      // debugger;
      runInAction(() => {
        this.internalPriceList.total = totalCount;
        this.internalPriceList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.internalPriceList.list = [...result];
        } else {
          this.internalPriceList.list = this.internalPriceList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.internalPriceList.refreshing = false;
        this.internalPriceList.loadingMore = false;
      });
    }
  }
  // 标准价格表
  @action async getStandardPriceListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.standardPriceList.refreshing = true;
      } else {
        this.standardPriceList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await getPriceList({ pageNumber, ...restProps });
      // debugger;
      runInAction(() => {
        this.standardPriceList.total = totalCount;
        this.standardPriceList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.standardPriceList.list = [...result];
        } else {
          this.standardPriceList.list = this.standardPriceList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.standardPriceList.refreshing = false;
        this.standardPriceList.loadingMore = false;
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
  //
  // // 新增
  // @action async createContactReq(options) {
  //   try {
  //     const {
  //       result = {},
  //     } = await createContact(options);
  //     debugger;
  //     runInAction(() => {
  //       // TODO next
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
  //       // TODO next
  //       this.contactDetails = { ...result };
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }
}

export default new PriceListStore();
