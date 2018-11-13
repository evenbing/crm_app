/**
 * @component contract.js
 * @description 合同
 * @time 2018/9/9
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import {
  getContractList,
  getContractDetails,
  createContract,
  updateContract,
  updateOwnerUser,
} from '../service/contract';
import Toast from '../utils/toast';
import { contractFlatList, initDetailMap } from './initState';
import { getReceivableIssueList } from '../service/receivable';
import { getAttachmentList } from '../service/attachment';

useStrict(true);

const initTotal = {
  issueTotal: 0,
  attaTotal: 0,
};

@autobind
class ContractStore {
  // 保存list的搜索对象, 提供给新增调取接口使用
  static queryProps = {};

  // 列表
  @observable contractList = contractFlatList;
  @action async getContractListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      this.queryProps = restProps;
      if (pageNumber === 1) {
        this.contractList.refreshing = true;
      } else {
        this.contractList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        totalPactMoney = 0,
        totalOverMoney = 0,
        totalFactMoney = 0,
        errors = [],
      } = await getContractList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.contractList.total = totalCount;
        this.contractList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.contractList = {
            ...this.contractList,
            list: result,
            totalPactMoney,
            totalOverMoney,
            totalFactMoney,
          };
        } else {
          this.contractList.list = this.contractList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.contractList.refreshing = false;
        this.contractList.loadingMore = false;
      });
    }
  }

  // 详情
  @observable contractDetails = initDetailMap;
  @action async getContractDetailsReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      this.contractDetails.refreshing = true;
      const {
        pact = {},
        errors = [],
      } = await getContractDetails({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.contractDetails.list = [pact];
        this.contractDetails.map = pact;
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.contractDetails.refreshing = false;
      });
    }
  }

  // 总计
  @observable contractTotal = initTotal;
  @action async getContactTotalReq({ id, moduleType, pageSize = 1 }) {
    try {
      this.contractTotal = initTotal;
      const {
        totalCount: issueTotal = 0,
        errors: issueErrors = [],
      } = await getReceivableIssueList({
        pactId: id,
        pageSize,
      });
      if (issueErrors.length) throw new Error(issueErrors[0].message);
      const {
        totalCount: attaTotal = 0,
        errors: attaErrors = [],
      } = await getAttachmentList({
        businessType: moduleType,
        businessId: id,
        pageSize,
      });
      if (attaErrors.length) throw new Error(attaErrors[0].message);
      runInAction(() => {
        this.contractTotal = {
          issueTotal,
          attaTotal,
        };
      });
    } catch (e) {
      Toast.showError(e.message);
      runInAction(() => {
        this.contractTotal = initTotal;
      });
    }
  }

  // 新增
  @action async createContractReq(options, callback) {
    try {
      const {
        errors = [],
      } = await createContract(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getContractListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 编辑
  @action async updateContractReq(options, callback) {
    try {
      const {
        errors = [],
      } = await updateContract(options);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.getContractDetailsReq({ id: options.id });
        this.getContractListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
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
        this.getContractDetailsReq({ id: options.id });
        this.getContractListReq(this.queryProps);
        callback && callback();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new ContractStore();
