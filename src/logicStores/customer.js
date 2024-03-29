/*
 * @Author: ShiQuan
 * @Date: 2018-09-11 01:10:41
 * @Last Modified by: Edmond.Shi
 * @Add JUSTIN XU 2018-10-11
 * @Last Modified time: 2018-09-12 13:35:17
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import { ToastUtil } from 'xn-react-native-applets';
import {
  find as getCustomerList,
  createCustomer,
  updateCustomer,
  getCustomerDetail,
  changeOwnerUser,
} from '../service/customer';
import {
  createFollow,
  deleteFollow,
  createLocationId,
  getCustomerName,
} from '../service/app';
import { initFlatList, initDetailMap } from './initState';
import { find as getTaskScheduleList } from '../service/taskSchedule';
import { ModuleType, TASK_SCHEDULE_TYPE, TASK_SCHEDULE_CATEGORY } from '../constants/enum';
import { getContactList } from '../service/contacts';
import { getSalesChanceList } from '../service/salesChance';
import { getContractList } from '../service/contract';

useStrict(true);

const initTotal = {
  scheduleTotal: 0,
  taskTotal: 0,
  contactTotal: 0,
  saleChanceTotal: 0,
  pactTotal: 0,
};

@autobind
class CustomerStore {
  // 保存list的搜索对象, 提供给新增调取接口使用
  static queryProps = {};

  // 列表
  @observable customerList = initFlatList;
  @action async getCustomerListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      this.queryProps = restProps;
      if (pageNumber === 1) {
        this.customerList.refreshing = true;
      } else {
        this.customerList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getCustomerList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.customerList.total = totalCount;
        this.customerList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.customerList.list = [...result];
        } else {
          this.customerList.list = this.customerList.list.concat(result);
        }
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.customerList.refreshing = false;
        this.customerList.loadingMore = false;
      });
    }
  }

  // 详情
  @observable customerDetail = initDetailMap;
  @action async getCustomerDetailReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        customer = {},
        errors = [],
      } = await getCustomerDetail({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.customerDetail.list = [customer];
        this.customerDetail.map = customer;
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }

  // 总计
  @observable customerTotal = initTotal;
  @action async getCustomerTotalReq({ id, pageSize = 1 }) {
    try {
      this.customerTotal = initTotal;
      const {
        totalCount: taskTotal = 0,
        errors: taskErrors = [],
      } = await getTaskScheduleList({
        type: TASK_SCHEDULE_TYPE.task,
        moduleId: id,
        moduleType: ModuleType.customer,
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
        moduleType: ModuleType.customer,
        category: TASK_SCHEDULE_CATEGORY.all,
        pageSize,
      });
      if (scheduleErrors.length) throw new Error(scheduleErrors[0].message);
      const {
        totalCount: contactTotal = 0,
        errors: contactErrors = [],
      } = await getContactList({ customerId: id, pageSize });
      if (contactErrors.length) throw new Error(contactErrors[0].message);
      const {
        totalCount: saleChanceTotal = 0,
        errors: saleChanceErrors = [],
      } = await getSalesChanceList({ customerId: id, pageSize });
      if (saleChanceErrors.length) throw new Error(saleChanceErrors[0].message);
      const {
        totalCount: pactTotal = 0,
        errors: pactErrors = [],
      } = await getContractList({ customerId: id, pageSize });
      if (pactErrors.length) throw new Error(pactErrors[0].message);
      runInAction(() => {
        this.customerTotal = {
          scheduleTotal,
          taskTotal,
          contactTotal,
          saleChanceTotal,
          pactTotal,
        };
      });
    } catch (e) {
      ToastUtil.showError(e.message);
      runInAction(() => {
        this.customerTotal = initTotal;
      });
    }
  }

  // 新增
  @action async createCustomerReq({ locationInfo, name, ...restProps }, callback) {
    try {
      const {
        result = [],
      } = await getCustomerName({ name });
      if (result.length) throw new Error('客户已存在');
      let locationId = null;
      if (locationInfo) {
        const { location: { id } } = await createLocationId(locationInfo);
        locationId = id;
      }
      const {
        errors = [],
      } = await createCustomer({ ...restProps, locationId, name });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getCustomerListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }

  // 编辑
  @action async updateCustomerReq({ locationInfo, name, ...restProps }, callback) {
    try {
      let locationId = null;
      if (locationInfo) {
        const { location: { id } } = await createLocationId(locationInfo);
        locationId = id;
      }
      const {
        errors = [],
      } = await updateCustomer({ ...restProps, locationId, name });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getCustomerDetailReq({ id: restProps.id });
        this.getCustomerListReq(this.queryProps);
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
      } = await changeOwnerUser(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getCustomerDetailReq({ id: options.id });
        this.getCustomerListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }

  // 关注
  @action async updateFollowStatusReq({ follow, followId, ...restProps }, callback) {
    try {
      // 已经关注则删除
      if (follow) {
        if (!followId) throw new Error('缺失关注id');
        const {
          errors = [],
        } = await deleteFollow({ id: followId });
        if (errors.length) throw new Error(errors[0].message);
        ToastUtil.showSuccess('取消关注成功');
      } else {
        // 执行关注
        const {
          errors = [],
        } = await createFollow(restProps);
        if (errors.length) throw new Error(errors[0].message);
        ToastUtil.showSuccess('关注成功');
      }
      runInAction(() => {
        this.getCustomerDetailReq({ id: restProps.objectId || restProps.id });
        this.getCustomerListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  }
}

export default new CustomerStore();
