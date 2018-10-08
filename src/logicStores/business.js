/*
 * @Author: Edmond.Shi 
 * @Date: 2018-10-08 17:13:10 
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-10-08 17:21:41
 */

import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  create,
  find,
} from '../service/business';
import Toast from '../utils/toast';
import { initFlatList, initDetailMap } from './initState';

useStrict(true);

@autobind
class BusinessStore {
  // 列表
  @observable businessList = initFlatList;
  // 详情
  @observable businessDetail = initDetailMap;

  // 详情
  @action async getBusinessDetailReq({ opportunityId }) {
    try {
      if (!opportunityId) throw new Error('opportunityId 不为空');
      this.businessDetail.refreshing = true;
      const {
        business = {},
        errors = [],
      } = await find({ opportunityId });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.businessDetail.list = [business];
        this.businessDetail.map = business;
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.businessDetail.refreshing = false;
      });
    }
  }

  // 新增
  @action async createBusinessReq({ businessDetails }, callback) {
    try {
      const {
        result = null,
        errors = [],
      } = await create({ businessDetails });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.businessDetail.map = result;
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new BusinessStore();
