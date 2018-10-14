/**
 * Created by DEV005 on 2017/8/31.
 */
import { Platform, Dimensions, StatusBar } from 'react-native';
/**
 * device info
 */
export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

const platform = Platform.OS;

export const isAndroid = platform === 'android';

export function formatStringWithHtml(originString) {
  if (originString === undefined) {
    return '';
  }
  const newString = originString
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  return newString;
}


// 是否 isIphoneX
export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

// 获取头部填充高度
export function getHeaderPadding(androidBar = false) {
  if (Platform.OS === 'android') {
    return androidBar ? StatusBar.currentHeight : 0;
  }
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 44;
    }
    return 20;
  }
}

// 获取头部高度
export function getHeaderHeight() {
  if (Platform.OS === 'android') {
    return 64;
  }
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 88;
    }
    return 64;
  }
}

// 获取头部填充底部填充高度
export function getFooterBottom() {
  if (Platform.OS === 'android') {
    return 0;
  }
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 34;
    }
    return 0;
  }
}

// 防止按钮多次触发
export const NoDoublePress = {
  lastPressTime: 1,
  onPress(callback, time = 500) {
    const curTime = new Date().getTime();
    if (curTime - this.lastPressTime > time) {
      this.lastPressTime = curTime;
      callback();
    }
  },
};

export function xnBorderWidth() {
  if (isIphoneX()) {
    return 1;
  }
  return 0.5;
}
