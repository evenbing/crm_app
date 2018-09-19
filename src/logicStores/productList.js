/**
 * @component productList.js
 * @description 产品列表
 * @time 2018/9/11
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getProductClazzList,
} from '../service/product';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class ProductListStore {
  // 产品列表
  @observable productList = { ...initFlatList, topList: [] };
  // 价格详情列表
  // @observable priceProductList = initFlatList;

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
      // 一维数组变成数形
      const topList = result.filter(v => !v.parentId);
      const twoList = result.filter(v => !!v.parentId);
      const threeList = [];
      if (twoList.length) {
        twoList.forEach((v) => {
          const index = topList.findIndex(item => item.id === v.parentId);
          if (index > -1) {
            topList[index].children = v;
          } else {
            threeList.push(v);
          }
        });
      }
      debugger;
      runInAction(() => {
        this.productList.total = totalCount;
        this.productList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.productList.list = [...result];
          this.productList.topList = [...topList];
        } else {
          this.productList.list = this.productList.list.concat(result);
          this.productList.topList = this.productList.topList.concat(result);
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
}

export default new ProductListStore();
