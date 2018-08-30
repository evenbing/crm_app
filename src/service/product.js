/**
 * @component product.js
 * @description 产品 service
 * @time 2018/8/28
 * @author zhao
 */
import { post } from '../utils/rpc';

/** 分页查询产品列表
 * @add by zhao
 * @params options
 * {
 *   isMyFollow 是否是我关注的产品 must
 *   keyword 关键字 must
 *   status 是否有效 must
 * }
 * @return Promise<Object>
 */
export function find({
  isMyFollow,
  keyword,
  status,
} = {}) {
  return post({
    method: 'api.customerrelations.product.find',
    isMyFollow,
    keyword,
    status,
  });
}

/** 查看产品目录列表
 * @add by zhao
 * @params options
 * {
 *   keyword 关键字
 * }
 * @return Promise<Object>
 */
export function findProductClazz({
  keyword,
} = {}) {
  return post({
    method: 'api.customerrelations.productClazz.find',
    keyword,
  });
}

/** 删除产品目录
 * @add by zhao
 * @params options
 * {
 *   id 主键Id must
 * }
 * @return Promise<Object>
 */
export function delProductClazz({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.productClazz.delete',
    id,
  });
}


/** 查看产品目录
 * @add by zhao
 * @params options
 * {
 *   id 主键Id must
 * }
 * @return Promise<Object>
 */
export function getProductClazz({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.productClazz.get',
    id,
  });
}

/** 编辑产品目录
 * @add by zhao
 * @params options
 * {
 * id 主键Id must
 * name 产品名称 must
 * parentId 父目录Id
 * level 目录级:1-顶级目录;2-二级目录;3-三级目录;4-四级目录 must
 * }
 * @return Promise<Object>
 */
export function updateProductClazz({
  id,
  name,
  parentId,
  level,
} = {}) {
  return post({
    method: 'api.customerrelations.productClazz.update',
    id,
    name,
    parentId,
    level,
  });
}


/** 创建产品目录
 * @add by zhao
 * @params options
 * {
 * name 产品名称 must
 * parentId 父目录Id
 * level 目录级:1-顶级目录;2-二级目录;3-三级目录;4-四级目录 must
 * }
 * @return Promise<Object>
 */
export function createProductClazz({
  name,
  parentId,
  level,
} = {}) {
  return post({
    method: 'api.customerrelations.productClazz.create',
    name,
    parentId,
    level,
  });
}


/** 关注产品
 * @add by zhao
 * @params options
 * {
 * objectType 关注类别：PRODUCT must
 * objectId productId must
 * objectName 产品名称 must
 * followTime 当前时间 must
 * }
 * @return Promise<Object>
 */
export function createFollow({
  objectType,
  objectId,
  objectName,
  followTime,
} = {}) {
  return post({
    method: 'api.customerrelations.follow.create',
    objectType,
    objectId,
    objectName,
    followTime,
  });
}

/** 删除产品
 * @add by zhao
 * @params options
 * {
 * id 主键Id must
 * }
 * @return Promise<Object>
 */
export function deleteProduct({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.product.delete',
    id,
  });
}


/** 查看产品产品资料，相关信息
 * @add by zhao
 * @params options
 * {
 * id 主键Id must
 * }
 * @return Promise<Object>
 */
export function getProduct({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.product.get',
    id,
  });
}


/** 禁用产品
 * @add by zhao
 * @params options
 * {
 * id 主键Id must
 * }
 * @return Promise<Object>
 */
export function inactiveProduct({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.product.inactive',
    id,
  });
}

/** 启用产品
 * @add by zhao
 * @params options
 * {
 * id 主键Id must
 * }
 * @return Promise<Object>
 */
export function activeProduct({
  id,
} = {}) {
  return post({
    method: 'api.customerrelations.product.active',
    id,
  });
}


/** 产品导出
 * @add by zhao
 * @params options
 * {
 * isMyFollow 是否是我关注的产品
 * status 是否有效 must
 * }
 * @return Promise<Object>
 */
export function exportProduct({
  isMyFollow,
  status,
} = {}) {
  return post({
    method: 'api.customerrelations.product.export',
    isMyFollow,
    status,
  });
}


/** 编辑产品
 * @add by zhao
 * @params options
 * {
 * id 主键Id must
 * productClazzId 产品类目ID must
 * departmentId 部门ID must
 * name 产品名称 must
 * price 产品价格 must
 * salesUnit 销售单位 must
 * describe 产品描述 must
 * status 启用状态:0:启用 1:禁用 must
 * }
 * @return Promise<Object>
 */
export function updateProduct({
  id,
  productClazzId,
  departmentId,
  name,
  price,
  salesUnit,
  describe,
  status,
} = {}) {
  return post({
    method: 'api.customerrelations.product.update',
    id,
    productClazzId,
    departmentId,
    name,
    price,
    salesUnit,
    describe,
    status,
  });
}


/** 创建产品
 * @add by zhao
 * @params options
 * {
 * productClazzId 产品类目ID must
 * departmentId 部门ID must
 * name 产品名称 must
 * price 产品价格 must
 * salesUnit 销售单位 must
 * describe 产品描述 must
 * status 启用状态:0:启用 1:禁用 must
 * }
 * @return Promise<Object>
 */
export function createProduct({
  productClazzId,
  departmentId,
  name,
  price,
  salesUnit,
  describe,
  status,
} = {}) {
  return post({
    method: 'api.customerrelations.product.create',
    productClazzId,
    departmentId,
    name,
    price,
    salesUnit,
    describe,
    status,
  });
}
