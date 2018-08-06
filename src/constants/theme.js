/**
 * @component theme.js
 * @description 主题
 * @time 2018/7/30
 * @author JUSTIN XU
 */
import { moderateScale } from '../utils/scale';

export default {
  primaryColor: '#18B548',
  headerBackgroundColor: '#333333',
  dangerColor: '#D32E2B',
  headerColor: '#ffffff',
  borderColor: '#F6F6F6',
  pageBackColor: '#F6F6F6',
  textColor: '#484848',
  fontMedium: 'PingFangSC-Medium',
  fontRegular: 'PingFangSC-Regular',
  avatarSize: 60,
  headerHeight: 45,
  iconSize: 22,
  moderateScale: (size, factor) => moderateScale(size, factor),
};
