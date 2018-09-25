/*
 * @Author: ShiQuan
 * @Date: 2018-09-24 19:40:21
 * @Last Modified by: ShiQuan
 * @Last Modified time: 2018-09-24 20:14:20
 */

import { action, observable, useStrict } from 'mobx/';
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
    businessType = 'APPSERVICE',
    businessCategory = 'COMMON',
  } = {}) {
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
      formdata.append('businessType', businessType);
      formdata.append('businessCategory', businessCategory);
      const result = await uploadImage(formdata);
      this.updateImageResult = { ...result };
      console.log(result);
    } catch (e) {
      Toast.showError(e.message);
    }
  }
}

export default new AttachmentStore();
