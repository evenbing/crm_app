/**
 * @component productList.js
 * @description 产品列表
 * @time 2018/9/11
 * @author JUSTIN XU
 */
import { action, observable, computed, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import { ToastUtil } from 'xn-react-native-applets';
import {
  getProductClazzList,
  updateProduct,
  getPriceProductList,
} from '../service/product';
import { getArrayByPid } from '../utils/base';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class ProductListStore {
  // 产品列表
  @observable productList = { ...initFlatList, topList: [] };
  // 产品列表选中
  @observable selectList = [];

  @computed get topList() {
    let { topList } = this.productList;
    this.selectList.forEach((v) => {
      topList = [...topList[v].children];
    });
    return topList;
  }

  // 切换选择list
  @action onPressSelectIndex(type, index) {
    if (type === 'up') {
      this.selectList.pop();
      return null;
    }
    if (type === 'down') {
      this.selectList.push(index);
      return null;
    }
  }

  // 获取产品列表
  @action async getProductClazzListReq({ priceId, ...restProps } = {}) {
    try {
      this.productList.refreshing = true;
      let data = {};
      if (priceId) {
        data = await getPriceProductList({ priceId });
      } else {
        data = await getProductClazzList(restProps);
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = data;
      if (errors.length) throw new Error(errors[0].message);
      const topList = getArrayByPid(result);
      runInAction(() => {
        this.productList.total = totalCount;
        this.productList.pageNumber = restProps.pageNumber;

        this.productList.list = [...result];
        this.productList.topList = [...topList];
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.productList.refreshing = false;
      });
    }
  }

  // 编辑产品
  @action async updateProductReq(options, callback) {
    try {
      await updateProduct(options);
      runInAction(() => {
        this.getProductClazzListReq();
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }
}

export default new ProductListStore();
