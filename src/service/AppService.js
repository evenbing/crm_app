import { post } from '../utils/rpc';

export default {
  /**
   * 获取承租人信息和用户id
   * @param data
   * @returns {*}
   */
  getPassportInfo({ id } = {}) {
    return post({
      method: 'api.security.passport.get',
      id,
    });
  },
  /**
   * 获取承租人信息
   * @param data
   * @returns {*}
   */
  getShoppingGuideInfo({ tenantId, userId } = {}) {
    return post({
      method: 'api.crm.marketing.shoppingGuide.find',
      tenantId,
      userId,
    });
  },
  getOperatingUnitId({
    systemType = 'B2C',
    deviceType = 'MOBILE',
    isActive = true,
  } = {}) {
    return post({
      method: 'api.ebusiness.systemSite.find',
      systemType,
      deviceType,
      isActive,
    });
  },
};
