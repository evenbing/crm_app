/**
 * @component theme.js
 * @description 主题
 * @time 2018/7/30
 * @author JUSTIN XU
 */
import { moderateScale } from '../utils/scale';

export default {
  primaryColor: '#18B548',
  whiteColor: '#FFFFFF',
  headerBackgroundColor: '#333333',
  dangerColor: '#D32E2B',
  headerColor: '#ffffff',
  borderColor: '#F6F6F6',
  pageBackColor: '#F6F6F6',
  textColor: '#484848',
  textGrayColor: '#A3A3A3',
  textSwipeItemColor: '#666666',
  textFormColor: '#373737',
  textPlaceholderColor: '#AEAEAE',
  textWeekColor: '#838383',
  textWeekDayColor: '#5E5E5E',
  listTitleColor: '#4F4F4F',
  listTipColor: '#787878',
  chartLineColor: '#5374C7',
  titleBackColor: '#FDFDFD',
  fontMedium: 'PingFangSC-Medium',
  fontRegular: 'PingFangSC-Regular',
  avatarSize: 60,
  headerHeight: 45,
  iconSize: 22,
  moderateScale: (size, factor) => moderateScale(size, factor),
  // form
  getLeftStyle: (inputProps, width = 80) => ({
    inputProps: {
      ...inputProps,
      fontSize: moderateScale(16),
    },
    leftTextStyle: {
      color: '#373737',
      width: moderateScale(width),
    },
    height: 44,
  }),
  navItemStyle: {
    leftWidth: 80,
    height: 44,
    showNavIcon: true,
  },
  navItemOnlyShowStyle: {
    leftWidth: 80,
    height: 44,
    showNavIcon: false,
  },
};
