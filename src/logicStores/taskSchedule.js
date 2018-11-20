/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-06 22:15:31
 * @Last Modified by: Edmond.Shi
 * @Add Justin Xu
 * @Last Modified time: 2018-10-11 17:54:17
 */
import { action, observable, runInAction, useStrict, computed } from 'mobx';
import autobind from 'autobind-decorator';
import {
  find, detail, create, update, del, updateTaskHours, updateTaskComplete,
} from '../service/taskSchedule';
// import { getAttachmentList } from '../service/attachment';
import { getMessage } from '../service/app';
// import { ModuleType } from '../constants/enum';
import { initFlatList } from './initState';
import Toast from '../utils/toast';
// import { getAppModuleType } from '../utils/base';

useStrict(true);

@autobind
class TaskScheduleStore {
  // 保存list的搜索对象, 提供给新增调取接口使用
  static queryProps = {};

  /**
   * 查询任务或日程
   */
  @observable taskScheduleList = initFlatList;
  @action async getTaskScheduleRelatedToMeReq({ pageNumber = 1, ...restProps }) {
    try {
      this.queryProps = restProps;
      if (pageNumber === 1) {
        this.taskScheduleList.refreshing = true;
      } else {
        this.taskScheduleList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await find({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.taskScheduleList.total = totalCount;
        this.taskScheduleList.pageNumber = pageNumber;
        if (pageNumber === 1) {
          this.taskScheduleList.list = [...result];
        } else {
          this.taskScheduleList.list = this.taskScheduleList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.taskScheduleList.refreshing = false;
        this.taskScheduleList.loadingMore = false;
      });
    }
  }

  /**
   * 查询任务详情
   */
  @observable taskDetailMap = {};
  @action async getTaskDetailMapReq(options) {
    try {
      this.taskDetailMap = {};
      const {
        taskSchedule = {},
      } = await detail(options);
      runInAction(() => {
        this.taskDetailMap = { ...taskSchedule };
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.taskScheduleList.refreshing = false;
      });
    }
  }

  /**
   * 查询日程详情
   */
  @observable scheduleDetailMap = {};
  @action async getScheduleDetailMapReq(options) {
    try {
      this.scheduleDetailMap = {};
      // const data = await getAttachmentList({
      //   // businessType: getAppModuleType(ModuleType),
      //   businessId: options.id,
      // });
      // debugger;
      const {
        taskSchedule = {},
      } = await detail(options);
      runInAction(() => {
        this.scheduleDetailMap = { ...taskSchedule };
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.taskScheduleList.refreshing = false;
      });
    }
  }

  // 获取未完成总数
  @computed get getUnFinishTotal() {
    const {
      taskList,
      scheduleList,
      messageList,
    } = this;
    return Number(taskList.total) + Number(scheduleList.total) + Number(messageList.total);
  }

  /**
   * 查询未完成日程/任务/消息
   */
  @action async getUnFinishTotalReq() {
    Promise.all([
      this.getScheduleRelatedToMeReq(),
      this.getTaskRelatedToMeReq(),
      this.getMessageReq(),
    ]);
  }

  /**
   * 查询未完成日程
   */
  @observable scheduleList = initFlatList;
  @action async getScheduleRelatedToMeReq({
    pageNumber = 1,
    pageSize = 0,
    type = 'SCHEDULE',
    category = 'UNREAD',
    ...restProps
  } = {}) {
    try {
      this.scheduleList.refreshing = true;
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await find({
        pageNumber,
        pageSize,
        type,
        category,
        ...restProps,
      });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.scheduleList.total = totalCount;
        this.scheduleList.pageNumber = pageNumber;
        this.scheduleList.list = [...result];
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.scheduleList.refreshing = false;
      });
    }
  }

  /**
   * 查询未完成任务
   */
  @observable taskList = initFlatList;
  @action async getTaskRelatedToMeReq({
    pageNumber = 1,
    pageSize = 0,
    type = 'TASK',
    category = 'UNREAD',
    ...restProps
  } = {}) {
    try {
      this.taskList.refreshing = true;
      const {
        result = [],
        errors = [],
      } = await find({
        pageNumber,
        pageSize,
        type,
        category,
        ...restProps,
      });
      if (errors.length) throw new Error(errors[0].message);
      const list = result.filter(v => !v.isCompleted);
      runInAction(() => {
        this.taskList.total = list.length || 0;
        this.taskList.pageNumber = pageNumber;
        this.taskList.list = list;
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.taskList.refreshing = false;
      });
    }
  }

  /**
   *  创建 任务或日程
   */
  @action async createTaskScheduleRelatedToMeReq(options, callback) {
    try {
      const {
        errors = [],
      } = await create(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        Toast.showSuccess(options.successMsg || '创建成功');
        this.getTaskScheduleRelatedToMeReq(this.queryProps);
        this.getTaskRelatedToMeReq();
        this.getScheduleRelatedToMeReq();
        setTimeout(() => {
          callback && callback();
        }, 1500);
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   *  修改 任务或日程 延迟时间
   */
  @action async updateTaskHoursReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateTaskHours(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getTaskScheduleRelatedToMeReq(this.queryProps);
        this.getTaskRelatedToMeReq();
        this.getScheduleRelatedToMeReq();
        callback && callback();
        Toast.showSuccess('更新延时成功');
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   *  修改 任务或日程 完成状态
   */
  @action async updateTaskCompleteReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateTaskComplete(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getTaskScheduleRelatedToMeReq(this.queryProps);
        this.getTaskRelatedToMeReq();
        callback && callback();
        Toast.showSuccess('设置完成成功');
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   *  修改 任务或日程
   */
  @action async updateTaskScheduleRelatedToMeReq(options, callback) {
    try {
      const {
        errors = [],
      } = await update(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getTaskScheduleRelatedToMeReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   * 删除任务或详情
   */
  @action async deleteTaskScheduleRelatedToMeReq(options, callback) {
    try {
      const {
        errors = [],
      } = await del(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getTaskScheduleRelatedToMeReq(this.queryProps);
        this.getTaskRelatedToMeReq();
        this.getScheduleRelatedToMeReq();
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  /**
   * 查询未读消息列表
   */
  @observable messageList = initFlatList;
  @action async getMessageReq({ pageNumber = 1, pageSize = 0, category = 'UNREAD', ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.messageList.refreshing = true;
      } else {
        this.messageList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getMessage({ pageNumber, pageSize, category, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.messageList.total = totalCount;
        this.messageList.pageNumber = pageNumber;
        if (pageNumber === 1) {
          this.messageList.list = [...result];
        } else {
          this.messageList.list = this.messageList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.messageList.refreshing = false;
        this.messageList.loadingMore = false;
      });
    }
  }
}

export default new TaskScheduleStore();
