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
} from '../service/contract';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class ContractStore {
  // 列表
  @observable contractList = initFlatList;
  @observable contractDetails = {};

  // 列表
  @action async getContractListReq({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.contractList.refreshing = true;
      } else {
        this.contractList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
      } = await getContractList({ pageNumber, ...restProps });
      runInAction(() => {
        this.contractList.total = totalCount;
        this.contractList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.contractList.list = [...result];
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
  @action async getContractDetailsReq({ id }) {
    try {
      if (!id) throw new Error('id 不为空');
      const {
        result = {},
        errors = [],
      } = await getContractDetails({ id });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 新增
  @action async createContractReq(options, goBack) {
    try {
      const {
        errors = [],
      } = await createContract(options);
      if (errors.length) throw new Error(errors[0].message);
      debugger;
      runInAction(() => {
        this.getContractListReq();
        goBack();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }

  // 编辑
  @action async updateContractReq(options) {
    try {
      const {
        result = {},
      } = await updateContract(options);
      debugger;
      runInAction(() => {
        // TODO next
        this.contactDetails = { ...result };
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new ContractStore();
