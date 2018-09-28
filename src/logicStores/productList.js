/**
 * @component productList.js
 * @description 产品列表
 * @time 2018/9/11
 * @author JUSTIN XU
 */
import { action, observable, computed, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getProductClazzList,
  updateProduct,
} from '../service/product';
import Toast from '../utils/toast';
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
  @action async getProductClazzListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.productList.refreshing = true;
      } else {
        this.productList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getProductClazzList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      const topList = getArrayByPid(result);
      debugger;
      runInAction(() => {
        this.productList.total = totalCount;
        this.productList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.productList.list = [...result];
          this.productList.topList = [...topList];
        } else {
          this.productList.list = this.productList.list.concat(result);
          this.productList.topList = this.productList.topList.concat(topList);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.productList.refreshing = false;
        this.productList.loadingMore = false;
      });
    }
  }

  // 编辑产品
  @action async updateProductReq(options, callback) {
    try {
      await updateProduct(options);
      runInAction(() => {
        debugger;
        this.getProductClazzListReq();
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new ProductListStore();
