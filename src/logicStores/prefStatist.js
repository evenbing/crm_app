/**
 * @component prefStatist.js
 * @description 业绩统计
 * @time 2018/9/9
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getSalesSum,
  getSalesTrend,
  getSalesEchart,
  getSalesRankingList,
} from '../service/prefStatist';
import Toast from '../utils/toast';

useStrict(true);

@autobind
class PrefStatistStore {
  // 列表
  @observable receivablePlanList = {
    pageNumber: 1,
    refreshing: false,
    loadingMore: false,
    list: [],
    total: 0,
  };

  @observable tabMap = {
    selectedIndex: 0,
    list: ['本月', '本季', '本年'],
  };
  // 销售总额数据统计
  @observable salesSumMap = {};
  // 销售趋势
  @observable salesRankingList = [];
  // 销售漏斗
  @observable salesStatisMap = {};
  // 销售排行
  @observable salesRankMap = {
    averAmount: 0,
    total: 0,
    list: [],
  };

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
    const obj = {};
    if (selectedIndex === 0) {
      obj.dateIdFrom = '20180810';
      obj.dateIdTo = '20180910';
    } else if (selectedIndex === 1) {
      obj.dateIdFrom = '20180810';
      obj.dateIdTo = '20181110';
    } else if (selectedIndex === 2) {
      obj.dateIdFrom = '20180810';
      obj.dateIdTo = '20191110';
    }
    // this.getSalesSumReq(obj);
    this.getSalesTrendReq(obj);
    // this.getSalesEchartReq(obj);
    this.getSalesRankingListReq(obj);
  }

  @action async getSalesSumReq(obj) {
    try {
      const {
        result = {},
      } = await getSalesSum(obj);
      runInAction(() => {
        this.salesSumMap = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  @action async getSalesTrendReq(obj) {
    try {
      this.salesRankingList = [];
      const {
        salesRankingList = [],
      } = await getSalesTrend(obj);
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
      this.salesStatisMap = {};
      const {
        result = {},
      } = await getSalesEchart(obj);
      runInAction(() => {
        this.salesStatisMap = result;
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  @action async getSalesRankingListReq(obj) {
    try {
      this.salesRankingList = [];
      const {
        averageCompletionAmount = 0,
        totalCount = 0,
        salesRankingList = [],
      } = await getSalesRankingList(obj);
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
