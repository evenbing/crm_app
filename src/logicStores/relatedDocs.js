/**
 * @component relatedDocs.js
 * @description 文档列表 service
 * @time 2018/10/8
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import { getAttachmentList } from '../service/attachment';
import Toast from '../utils/toast';
import { initFlatList } from './initState';

useStrict(true);

@autobind
class RelatedDocsStore {
  @observable relatedDocsList = initFlatList;

  @action clearAttachmentList() {
    this.relatedDocsList = initFlatList;
  }

  @action async getAttachmentList({ pageNumber = 1, ...restProps } = {}) {
    try {
      if (pageNumber === 1) {
        this.relatedDocsList.refreshing = true;
      } else {
        this.relatedDocsList.loadingMore = true;
      }
      const {
        result = [],
        totalCount = 0,
        errors = [],
      } = await getAttachmentList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.relatedDocsList.total = totalCount;
        this.relatedDocsList.pageNumber = pageNumber;

        if (pageNumber === 1) {
          this.relatedDocsList.list = [...result];
        } else {
          this.relatedDocsList.list = this.relatedDocsList.list.concat(result);
        }
      });
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      runInAction(() => {
        this.relatedDocsList.refreshing = false;
        this.relatedDocsList.loadingMore = false;
      });
    }
  }
}

export default new RelatedDocsStore();
