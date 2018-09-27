/**
 * @component initState.js
 * @description 详情动态store
 * @time 2018/9/11
 * @author JUSTIN XU
 */
import moment from 'moment';
import { action, observable, computed, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import uuidv1 from 'uuid/v1';
import {
  getDynamicList,
  createDynamic,
} from '../service/dynamic';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

const FormatType = 'YYYY-MM-DD';

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
    const resultList = list.sort((a, b) => (Number(a.creationTime) < Number(b.creationTime)));
    const hashMap = new Map();
    return resultList.reduce((item, next, currentIndex) => {
      const nextDate = moment(Number(next.creationTime));
      const nextFormatDate = nextDate.format(FormatType);
      const prevIndex = hashMap.get(nextFormatDate);
      if ((prevIndex || prevIndex === 0) && prevIndex < item.length) {
        item[prevIndex].list.push(next);
      } else {
        let type; // 0 其他时间 1为当前时间
        let nextMonth;
        let nextDay;
        const nowFormatDate = moment().format(FormatType);
        hashMap.set(nextFormatDate, currentIndex);
        if (nextFormatDate === nowFormatDate) {
          type = 1;
        } else {
          nextMonth = nextDate.month() + 1;
          nextDay = nextDate.date();
          type = 0;
        }
        const key = uuidv1();
        item.push({
          key,
          type,
          nextMonth,
          nextDay,
          list: [next],
        });
      }
      return item;
    }, []);
  }

  @action clearModuleType() {
    this.moduleType = null;
  }

  // 列表
  @action async getDynamicListReq({ pageNumber = 1, moduleType, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.dynamicList.refreshing = true;
      } else {
        this.dynamicList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await getDynamicList({ pageNumber, moduleType, ...restProps });
      runInAction(() => {
        this.dynamicList.total = totalCount;
        this.dynamicList.pageNumber = pageNumber;
        if (pageNumber === 1) {
          this.dynamicList = {
            ...this.dynamicList,
            [`${moduleType}List`]: result,
          };
        } else {
          const list = this.dynamicList[`${moduleType}List`].concat(result);
          this.dynamicList = {
            ...this.dynamicList,
            [`${moduleType}List`]: list,
          };
          // this.dynamicList[`${moduleType}List`] = this.dynamicList[`${moduleType}List`].concat(result);
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
  @action async createDynamicReq({ moduleType, moduleId, ...restProps }, callback) {
    try {
      await createDynamic({ moduleType, moduleId, ...restProps });
      callback && callback();
      runInAction(() => {
        this.getDynamicListReq({ moduleType, moduleId });
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new DynamicStore();
