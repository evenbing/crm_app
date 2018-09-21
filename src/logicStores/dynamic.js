/*
 * @Author: ShiQuan
 * @Date: 2018-09-11 01:10:41
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-12 13:35:17
 */
import moment from 'moment';
import { action, observable, computed, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getDynamicList,
  createDynamic,
} from '../service/dynamic';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class DynamicStore {
  // 列表
  @observable dynamicList = initFlatList;
  // 详情
  @observable dynamicDetail = {};
  @observable moduleType = null;

  @computed get getDynamic() {
    const { moduleType } = this;
    if (!moduleType) return [];
    const list = this.dynamicList[`${moduleType}List`] || [];
    if (!list.length) return [];
    const resultList = list.sort((a, b) => (Number(a.creationTime) > Number(b.creationTime)));
    const hashMap = new Map();
    return resultList.reduce((item, next, currentIndex) => {
      const prevIndex = hashMap.get(next.creationTime);
      if (prevIndex || prevIndex === 0) {
        item[prevIndex].list.push(next);
      } else {
        hashMap.set(next.creationTime, currentIndex);
        let type; // 0 其他时间 1为当前时间
        let nextMonth;
        let nextDay;
        const nextDate = moment(Number(next.creationTime));
        const nowDate = moment();
        if (nextDate.year() === nowDate.year()
          && nextDate.month() === nowDate.month()
          && nextDate.date() === nowDate.date()
        ) {
          type = 1;
        } else {
          nextMonth = nextDate.month() + 1;
          nextDay = nextDate.date();
          type = 0;
        }
        item.push({
          type,
          nextMonth,
          nextDay,
          list: [next] });
      }
      return item;
    }, []);
  }

  // 列表
  @action async getDynamicListReq({ pageNumber = 1, moduleType, ...restProps } = {}) {
    try {
      this.moduleType = null;
      if (pageNumber === 1) {
        this.dynamicList.refreshing = true;
      } else {
        this.dynamicList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await getDynamicList({ pageNumber, ...restProps });
      runInAction(() => {
        this.dynamicList.total = totalCount;
        this.dynamicList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.dynamicList[`${moduleType}List`] = [...result];
        } else {
          this.dynamicList[`${moduleType}List`] = this.dynamicList[`${moduleType}List`].concat(result);
        }
        this.moduleType = moduleType;
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.dynamicList.refreshing = false;
        this.dynamicList.loadingMore = false;
      });
    }
  }

  // 新增
  @action async createDynamicReq(options) {
    try {
      const {
        result = {},
      } = await createDynamic(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.dynamicDetail = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new DynamicStore();
