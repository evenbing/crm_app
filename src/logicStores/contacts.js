/**
 * @component contacts.js
 * @description 联系人
 * @time 2018/9/5
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import { ToastUtil } from 'xn-react-native-applets';
import {
  getContactList,
  createContact,
  getContactDetails,
  updateContact,
  updateOwnerUser,
} from '../service/contacts';
import { find as getTaskScheduleList } from '../service/taskSchedule';
import { ModuleType, TASK_SCHEDULE_TYPE, TASK_SCHEDULE_CATEGORY } from '../constants/enum';
import { getSalesChanceList } from '../service/salesChance';
import { createLocationId } from '../service/app';
import { initFlatList, initDetailMap } from './initState';

useStrict(true);

const initTotal = {
  scheduleTotal: 0,
  taskTotal: 0,
  salesTotal: 0,
};

@autobind
class ContactStore {
  // 保存list的搜索对象, 提供给新增调取接口使用
  static queryProps = {};

  // 列表
  @observable contactList = initFlatList;
  @action async getContactListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      this.queryProps = restProps;
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
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.contactList.refreshing = false;
        this.contactList.loadingMore = false;
      });
    }
  }

  // 详情
  @observable contactDetails = initDetailMap;
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
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.contactDetails.refreshing = false;
      });
    }
  }

  // 总计
  @observable contactTotal = initTotal;
  @action async getContactTotalReq({ id, pageSize = 1 }) {
    try {
      this.contactTotal = initTotal;
      const {
        totalCount: taskTotal = 0,
        errors: taskErrors = [],
      } = await getTaskScheduleList({
        type: TASK_SCHEDULE_TYPE.task,
        moduleId: id,
        moduleType: ModuleType.contact,
        category: TASK_SCHEDULE_CATEGORY.all,
        pageSize,
      });
      if (taskErrors.length) throw new Error(taskErrors[0].message);
      const {
        totalCount: scheduleTotal = 0,
        errors: scheduleErrors = [],
      } = await getTaskScheduleList({
        type: TASK_SCHEDULE_TYPE.schedule,
        moduleId: id,
        moduleType: ModuleType.contact,
        category: TASK_SCHEDULE_CATEGORY.all,
        pageSize,
      });
      if (scheduleErrors.length) throw new Error(scheduleErrors[0].message);
      const {
        totalCount: salesTotal = 0,
        errors: salesErrors = [],
      } = await getSalesChanceList({ customerId: id, pageSize });
      if (salesErrors.length) throw new Error(salesErrors[0].message);
      runInAction(() => {
        this.contactTotal = {
          scheduleTotal,
          taskTotal,
          salesTotal,
        };
      });
    } catch (e) {
      ToastUtil.showError(e.message);
      runInAction(() => {
        this.contactTotal = initTotal;
      });
    }
  }

  // 新增
  @action async createContactReq({ locationInfo, ...restProps }, callback) {
    try {
      let locationId = null;
      if (locationInfo) {
        const { location: { id } } = await createLocationId(locationInfo);
        locationId = id;
      }
      const {
        errors = [],
      } = await createContact({ ...restProps, locationId });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getContactListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }

  // 编辑
  @action async updateContactReq({ locationInfo, ...restProps }, callback) {
    try {
      let locationId = null;
      if (locationInfo) {
        const { location: { id } } = await createLocationId(locationInfo);
        locationId = id;
      }
      const {
        errors = [],
      } = await updateContact({ ...restProps, locationId });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getContactDetailsReq({ id: restProps.id });
        this.getContactListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }

  // 转移负责人
  @action async updateOwnerUserReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateOwnerUser(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getContactDetailsReq({ id: options.id });
        this.getContactListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }
}

export default new ContactStore();
