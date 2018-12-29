/**
 * @component relatedDocs.js
 * @description 文档列表 service
 * @time 2018/10/8
 * @author JUSTIN XU
 */
import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import { ToastUtil } from 'xn-react-native-applets';
import { getAttachmentList } from '../service/attachment';
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
      this.relatedDocsList.refreshing = true;
      const {
        attachmentList = [],
        errors = [],
      } = await getAttachmentList({ pageNumber, ...restProps });
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.relatedDocsList.total = attachmentList.length;
        this.relatedDocsList.pageNumber = pageNumber;
        this.relatedDocsList.list = [...attachmentList];
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    } finally {
      runInAction(() => {
        this.relatedDocsList.refreshing = false;
      });
    }
  }
}

export default new RelatedDocsStore();
