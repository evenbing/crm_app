/**
 * @component priceList.js
 * @description 价格表
 * @time 2018/9/11
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getPriceList,
  updatePriceToActive,
  updatePriceToInActive,
  getPriceProductList,
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
  @action async updatePriceActiveStatus({ item }) {
    try {
      const { id, isActive } = item;
      if (!id) throw new Error('id 不为空');
      let data;
      if (isActive) { // 当为激活则执行关闭操作
        data = await updatePriceToInActive({ id });
      } else {
        data = await updatePriceToActive({ id });
      }
      if (data.errors.length) throw new Error(data.errors[0].message);
      runInAction(() => {
        this.getPriceListReq();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 查看价格产品表
  @action async getPriceProductListReq({ id }) {
    try {
      this.priceProductList = initFlatList;
      const {
        priceProductList = [],
        errors = [],
      } = await getPriceProductList({ id });
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
}

export default new PriceListStore();
