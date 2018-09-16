/*
 * @Author: ShiQuan
 * @Date: 2018-09-11 01:10:41
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-12 13:35:17
 */

import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  find,
  create,
  // updateDynamic,
  // getDynamicDetail,
} from '../service/dynamic';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class DynamicStore {
  // 列表
  @observable dynamicList = initFlatList;

  // 详情
  @observable dynamicDetail = {};

  // 列表
  @action async getDynamicListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.dynamicList.refreshing = true;
      } else {
        this.dynamicList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await find({ pageNumber, ...restProps });
      runInAction(() => {
        this.dynamicList.total = totalCount;
        this.dynamicList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.dynamicList.list = [...result];
        } else {
          this.dynamicList.list = this.dynamicList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.dynamicList.refreshing = false;
        this.dynamicList.loadingMore = false;
      });
    }
  }

  // // 详情
  // @action async getDynamicDetailReq({ id }) {
  //   try {
  //     if (!id) throw new Error('id 不为空');
  //     const {
  //       result = {},
  //       errors = [],
  //     } = await getDynamicDetail({ id });
  //     if (errors.length) throw new Error(errors[0].message);
  //     runInAction(() => {
  //       this.dynamicDetail = { ...result };
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }

  // 新增
  @action async createDynamicReq(options) {
    try {
      const {
        result = {},
      } = await create(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.dynamicDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 编辑
  // @action async updateDynamicReq(options) {
  //   try {
  //     const {
  //       result = {},
  //     } = await updateDynamic(options);
  //     debugger;
  //     runInAction(() => {
  //       // TODO next
  //       this.dynamicDetail = { ...result };
  //     });
  //   } catch (e) {
  //     Toast.showError(e.message);
  //   }
  // }
}

export default new DynamicStore();
