/**
 * @component contacts.js
 * @description 联系人
 * @time 2018/9/5
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx';
import autobind from 'autobind-decorator';
import {
  getContactList,
  createContact,
  getContactDetails,
} from '../service/contacts';
import Toast from '../utils/toast';

useStrict(true);

@autobind
class ContactStore {
  // 列表
  @observable contactList = {
    pageNumber: 1,
    refreshing: false,
    loadingMore: false,
    list: [],
    total: 0,
  };
  @observable contactDetails = {};

  // 列表
  @action async getContactListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.contactList.refreshing = true;
      } else {
        this.contactList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await getContactList({ pageNumber, ...restProps });
      runInAction(() => {
        this.contactList.total = totalCount;
        this.contactList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.contactList.list = [...result];
        } else {
          this.contactList.list = this.contactList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.contactList.refreshing = false;
        this.contactList.loadingMore = false;
      });
    }
  }

  // 详情
  @action async getContactDetailsReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        result = {},
      } = await getContactDetails({ id });
      debugger;
      runInAction(() => {
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 新增
  @action async createContactReq(options) {
    try {
      const {
        result = {},
      } = await createContact(options);
      debugger;
      runInAction(() => {
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new ContactStore();
