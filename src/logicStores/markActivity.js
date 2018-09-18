/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-11 10:26:48
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-11 11:36:39
 */

import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getMarkActivityList,
  createMarkActivity,
  getMarkActivityDetail,
  updateMarkActivity,
  changeOwnerUser,
  batchCreateFollow,
} from '../service/markActivity';
import Toast from '../utils/toast';
import { initFlatList } from './initState';


useStrict(true);

@autobind
class MarkActivityStore {
  // 列表
  @observable markActivityList = initFlatList;

  // 详情
  @observable markActivityDetail = {}

  // 列表
  @action async getMarkActivityListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.markActivityList.refreshing = true;
      } else {
        this.markActivityList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getMarkActivityList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.markActivityList.total = totalCount;
        this.markActivityList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.markActivityList.list = [...result];
        } else {
          this.markActivityList.list = this.markActivityList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.markActivityList.refreshing = false;
        this.markActivityList.loadingMore = false;
      });
    }
  }

   // 详情
   @action async getMarkActivityDetailReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        result = {},
        errors = [],
      } = await getMarkActivityDetail({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.markActivityDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

   // 新增
   @action async createMarkActivityReq(options) {
     try {
       const {
         result = {},
         errors = [],
       } = await createMarkActivity(options);
       if (errors.length) throw new Error(errors[0].message);
       debugger;
       runInAction(() => {
         // TODO next
         this.markActivityDetail = { ...result };
       });
     } catch (e) {
       Toast.showError(e.message);
     }
   }

   // 编辑
   @action async updateMarkActivityReq(options) {
     try {
       const {
         result = {},
         errors = [],
       } = await updateMarkActivity(options);
       if (errors.length) throw new Error(errors[0].message);
       debugger;
       runInAction(() => {
         // TODO next
         this.markActivityDetail = { ...result };
       });
     } catch (e) {
       Toast.showError(e.message);
     }
   }

   //  // 合并相同的客户
   //  @action async mergeSalesChanceReq(options) {
   //    try {
   //      const {
   //        result = {},
   //      } = await mergeSalesChance(options);
   //      debugger;
   //      runInAction(() => {
   //        // TODO next
   //        this.markActivityDetail = { ...result };
   //      });
   //    } catch (e) {
   //      Toast.showError(e.message);
   //    }
   //  }

   // 转移客户负责人
   @action async changeOwnerUserReq(options) {
     try {
       const {
         result = {},
       } = await changeOwnerUser(options);
       debugger;
       runInAction(() => {
         // TODO next
         this.markActivityDetail = { ...result };
       });
     } catch (e) {
       Toast.showError(e.message);
     }
   }

   // 关注
   @action async batchCreateFollowReq(options) {
     try {
       const {
         result = {},
       } = await batchCreateFollow(options);
       debugger;
       runInAction(() => {
         // TODO next
         //  this.markActivityDetail = { ...result };
       });
     } catch (e) {
       Toast.showError(e.message);
     }
   }
}

export default new MarkActivityStore();
