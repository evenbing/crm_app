/*
 * @Author: ShiQuan
 * @Date: 2018-09-24 19:32:30
 * @Last Modified by: ShiQuan
 * @Last Modified time: 2018-09-24 20:18:59
 */
import { rpcUtil } from 'xn-react-native-applets';

const { post, uploadImage } = rpcUtil;

// 上传图片
export function uploadImageReq(formData) {
  return uploadImage(formData);
}

/** 获取附件
 * @add by justin
 * @params options
 * {
 *   pageNumber 页码
 *   pageSize 每页数量 0 通用为全部
 *   businessType 业务类型
 *   businessId 业务ID 业务ID和业务ID集合至少传一个
 *   businessCategory 业务类别
 *   businessIds 业务ID集合
 * }
 * @return Promise<Object>
 */
export function getAttachmentList({
  pageNumber = 1,
  pageSize = 0,
  businessType,
  businessId,
  businessCategory,
  businessIds,
} = {}) {
  return post({
    method: 'api.foundation.attachmentByBizInfo.get',
    pageNumber,
    pageSize,
    businessType,
    businessId,
    businessCategory,
    businessIds,
  });
}

/**
 * 删除附件
 * @param {*} param0
 */
export function attachmentDelete({ id } = {}) {
  return post({
    method: 'api.foundation.attachment.delete',
    attachmentId: id,
  });
}
