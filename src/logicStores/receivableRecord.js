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
  updateReceivableRecord,
} from '../service/receivableRecord';
import Toast from '../utils/toast';
import { initDetailMap, receivableFlatList } from './initState';
import { getAttachmentList } from '../service/attachment';

useStrict(true);

const initTotal = {
  attaTotal: 0,
};

@autobind
class ReceivableRecordStore {
  // 列表
  @observable receivableRecordList = receivableFlatList;
  @observable receivableRecordDetails = initDetailMap;
  @observable receivableRecordTotal = initTotal;

  // 保存list的搜索对象, 提供给新增调取接口使用
  static queryProps = {};

  // 列表
  @action async getReceivableRecordListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      this.queryProps = restProps;
      if (pageNumber === 1) {
        this.receivableRecordList.refreshing = true;
      } else {
        this.receivableRecordList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        totalFactPrice = 0,
        totalOverTimePrice = 0,
        totalPlanPrice = 0,
        totalPrice = 0,
        totalUnreceivablePrice = 0,
        errors = [],
      } = await getReceivableRecordList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.receivableRecordList.total = totalCount;
        this.receivableRecordList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.receivableRecordList = {
            ...this.receivableRecordList,
            list: result,
            totalFactPrice,
            totalOverTimePrice,
            totalPlanPrice,
            totalPrice,
            totalUnreceivablePrice,
          };
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
        receivableDetail = {},
        errors = [],
      } = await getReceivableRecordDetails({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.receivableRecordDetails.list = [receivableDetail];
        this.receivableRecordDetails.map = receivableDetail;
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.receivableRecordDetails.refreshing = false;
      });
    }
  }

  // 总计
  @action async getReceivableRecordTotalReq({ id, pageSize = 1 }) {
    try {
      const {
        totalCount: attaTotal = 0,
        errors: attaErrors = [],
      } = await getAttachmentList({
        businessId: id,
        pageSize,
      });
      if (attaErrors.length) throw new Error(attaErrors[0].message);
      runInAction(() => {
        this.receivableRecordTotal = {
          attaTotal,
        };
      });
    } catch (e) {
      Toast.showError(e.message);
      runInAction(() => {
        this.receivableRecordTotal = initTotal;
      });
    }
  }

  // 编辑
  @action async updateReceivableRecordReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateReceivableRecord(options);
      if (errors.length) throw new Error(errors[0].message);
      debugger;
      runInAction(() => {
        this.getReceivableRecordDetailsReq({ id: options.id });
        this.getReceivableRecordListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new ReceivableRecordStore();
