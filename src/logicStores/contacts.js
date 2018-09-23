/**
 * @component contacts.js
 * @description 联系人
 * @time 2018/9/5
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getContactList,
  createContact,
  getContactDetails,
  updateContact,
} from '../service/contacts';
import Toast from '../utils/toast';
import { initFlatList, initDetailMap } from './initState';

useStrict(true);

@autobind
class ContactStore {
  // 列表
  @observable contactList = initFlatList;
  @observable contactDetails = initDetailMap;

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
        errors = [],
      } = await getContactList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
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
      this.contactDetails.refreshing = true;
      const {
        contact = {},
        errors = [],
      } = await getContactDetails({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.contactDetails.list = [contact];
        this.contactDetails.map = contact;
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.contactDetails.refreshing = false;
      });
    }
  }

  // 新增
  @action async createContactReq(options, callback) {
    try {
      const {
        errors = [],
      } = await createContact(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getContactListReq();
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 编辑
  @action async updateContactReq(options, callback) {
    try {
      debugger;
      const {
        errors = [],
      } = await updateContact(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getContactDetailsReq({ id: options.id });
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new ContactStore();
