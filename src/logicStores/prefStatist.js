/**
 * @component prefStatist.js
 * @description 业绩统计
 * @time 2018/9/9
 * @author JUSTIN XU
 */
import moment from 'moment';
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getSalesSum,
  getSalesTrend,
  getSalesEchart,
  getSalesRankingList,
} from '../service/prefStatist';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

function getMonth(month) {
  if (month < 10) return `0${month}`;
  return month;
}

@autobind
class PrefStatistStore {
  // 列表
  @observable receivablePlanList = initFlatList;

  @observable tabMap = {
    selectedIndex: 0,
    list: ['本月', '本季', '本年'],
  };
  // 销售总额数据统计
  @observable salesSumMap = {
    completedSalesSum: 0,
    expectSalesSum: 0,
    funnelSalesSum: 0,
  };
  // 销售趋势
  @observable salesRankingList = [];
  // 销售漏斗
  @observable salesStatisticList = [];
  // 销售排行
  @observable salesRankMap = {
    averAmount: 0,
    total: 0,
    list: [],
  };
  @observable refreshing = false;

  @action onToggleTabSelectIndex(index) {
    const {
      selectedIndex,
    } = this.tabMap;
    if (selectedIndex === index) return;
    this.tabMap.selectedIndex = index;
    this.getData();
  }

  @action async getData() {
    const {
      selectedIndex,
    } = this.tabMap;
    this.refreshing = true;
    const year = moment().year();
    const month = moment().month() + 1;
    const quarter = moment().quarter();
    const obj = {};
    if (selectedIndex === 0) {
      obj.dateIdFrom = `${year}${getMonth(month)}01`;
      obj.dateIdTo = `${year}${getMonth(month)}${new Date(year, month, 0).getDate()}`;
    } else if (selectedIndex === 1) {
      const startMonth = (3 * (quarter - 1)) + 1;
      const endMonth = startMonth + 2;
      obj.dateIdFrom = `${year}${getMonth(startMonth)}01`;
      obj.dateIdTo = `${year}${getMonth(endMonth)}${new Date(year, endMonth, 0).getDate()}`;
    } else if (selectedIndex === 2) {
      obj.dateIdFrom = `${year}0101`;
      obj.dateIdTo = `${year}1231`;
    }
    await Promise.all([
      this.getSalesSumReq(obj),
      this.getSalesTrendReq(obj),
      this.getSalesEchartReq(obj),
      this.getSalesRankingListReq(obj),
    ]);
    runInAction(() => {
      this.refreshing = false;
    });
  }

  @action async getSalesSumReq(obj) {
    try {
      const {
        completedSalesSum = 0,
        expectSalesSum = 0,
        funnelSalesSum = 0,
        errors = [],
      } = await getSalesSum(obj);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesSumMap = {
          completedSalesSum,
          expectSalesSum,
          funnelSalesSum,
        };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  @action async getSalesTrendReq(obj) {
    try {
      const {
        salesRankingList = [],
        errors = [],
      } = await getSalesTrend(obj);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        const list = salesRankingList.map((v) => {
          v.dateId = v.monthId;
          v.achievement = v.completedTotalMoney;
          return v;
        });
        this.salesRankingList = list;
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  @action async getSalesEchartReq(obj) {
    try {
      const {
        salesStatisticList = {},
        errors = [],
      } = await getSalesEchart(obj);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesStatisticList = [...salesStatisticList];
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  @action async getSalesRankingListReq(obj) {
    try {
      const {
        averageCompletionAmount = 0,
        totalCount = 0,
        salesRankingList = [],
        errors = [],
      } = await getSalesRankingList(obj);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.salesRankMap = {
          averAmount: averageCompletionAmount,
          total: totalCount,
          list: salesRankingList,
        };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new PrefStatistStore();
