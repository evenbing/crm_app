/*
 * @Author: ShiQuan
 * @Date: 2018-09-24 19:32:30
 * @Last Modified by: ShiQuan
 * @Last Modified time: 2018-09-24 20:18:59
 */
import { uploadImage as uploadImg } from '../utils/rpc';

// 上传图片
export function uploadImage(formData) {
  return uploadImg(formData);
}
