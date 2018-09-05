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
  // 详情
  @observable contactList = {

  };
  @observable contactDetails = {};

  // 列表
  @action async getContactListReq(options = {}) {
    try {
      const {
        result = [],
      } = await getContactList(options);
      debugger;
      runInAction(() => {
        this.contactList = { list: result };
      });
    } catch (e) {
      Toast.showError(e.message);
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
