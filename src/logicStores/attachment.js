/*
 * @Author: ShiQuan
 * @Date: 2018-09-24 19:40:21
 * @Last Modified by: ShiQuan
 * @Last Modified time: 2018-09-24 20:14:20
 */

import { action, observable, runInAction, useStrict } from 'mobx/';
import autobind from 'autobind-decorator';
import { uploadImage } from '../service/attachment';
import Toast from '../utils/toast';

useStrict(true);

@autobind
class AttachmentStore {
  // 上传图片的结果
  @observable updateImageResult = {};

  /**
   * 上传图片
   * @param {*} pic
   */
  @action async uploadImageReq({
    file,
    businessId,
    businessType,
    // businessCategory = 'COMMON',
  } = {}, callback) {
    try {
      const fileName = file.name;
      const ext = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length);
      const name = fileName.substr(0, fileName.lastIndexOf('.'));
      const formdata = new FormData();
      // formdata.append('file', file);
      // formdata.append('ext', 'image/jpeg');
      // formdata.append('name', 'header');
      // formdata.append('type', 'AVATAR');

      formdata.append('file', file);
      formdata.append('FileName', name);
      formdata.append('Ext', ext);
      formdata.append('method', 'api.foundation.attachment.upload');
      formdata.append('businessId', businessId);
      formdata.append('businessType', `CRM_${businessType}`);
      // formdata.append('businessCategory', businessCategory);
      const {
        errors = [],
        ...restProps
      } = await uploadImage(formdata);
      if (errors.length) throw new Error(errors[0].message);
      runInAction(() => {
        this.updateImageResult = { ...restProps };
        callback && callback(restProps);
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new AttachmentStore();
