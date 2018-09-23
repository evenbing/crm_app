/**
 * @component receivableRecord.js
 * @description 回款记录
 * @time 2018/9/9
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getReceivableRecordList,
  getReceivableRecordDetails,
  createReceivableRecord,
  updateReceivableRecord,
} from '../service/receivableRecord';
import Toast from '../utils/toast';
import { initDetailMap, initFlatList } from './initState';

useStrict(true);

@autobind
class ReceivableRecordStore {
  // 列表
  @observable receivableRecordList = initFlatList;
  @observable receivableRecordDetails = initDetailMap;

  // 列表
  @action async getReceivableRecordListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.receivableRecordList.refreshing = true;
      } else {
        this.receivableRecordList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getReceivableRecordList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.receivableRecordList.total = totalCount;
        this.receivableRecordList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.receivableRecordList.list = [...result];
        } else {
          this.receivableRecordList.list = this.receivableRecordList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.receivableRecordList.refreshing = false;
        this.receivableRecordList.loadingMore = false;
      });
    }
  }

  // 详情
  @action async getReceivableRecordDetailsReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      this.receivableRecordDetails.refreshing = true;
      const {
        receivableRecord = {},
        errors = [],
      } = await getReceivableRecordDetails({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.receivableRecordDetails.list = [receivableRecord];
        this.receivableRecordDetails.map = receivableRecord;
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.receivableRecordDetails.refreshing = false;
      });
    }
  }

  // 新增
  @action async createReceivableRecordReq(options) {
    try {
      const {
        result = {},
        errors = [],
      } = await createReceivableRecord(options);
      if (errors.length) throw new Error(errors[0].message);
      debugger;
      runInAction(() => {
        // TODO next
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 编辑
  @action async updateReceivableRecordReq(options) {
    try {
      const {
        result = {},
        errors = [],
      } = await updateReceivableRecord(options);
      if (errors.length) throw new Error(errors[0].message);
      debugger;
      runInAction(() => {
        // TODO next
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new ReceivableRecordStore();
