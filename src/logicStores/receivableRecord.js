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
} from '../service/receivableRecord';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class ReceivableRecordStore {
  // 列表
  @observable receivableRecordList = initFlatList;
  // @observable contactDetails = {};

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
      } = await getReceivableRecordList({ pageNumber, ...restProps });
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

export default new ReceivableRecordStore();
