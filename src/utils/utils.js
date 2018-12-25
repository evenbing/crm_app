/**
 * Created by DEV005 on 2017/8/31.
 */
import { Platform, Dimensions, StatusBar } from 'react-native';
/**
 * device info
 */
export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

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

export const currPlatform = Platform.OS;
export function isIos() {
  return currPlatform === 'ios';
}

export function isAndroid() {
  return currPlatform === 'android';
}

// iPhoneX Xs
const X_WIDTH = 375;
const X_HEIGHT = 812;

// 是否 isIphoneX
export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
      (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
  );
}

// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

// 判断是否为iphoneXR或XsMAX
export function isIphoneXR() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((deviceHeight === XR_HEIGHT && deviceWidth === XR_WIDTH) ||
      (deviceHeight === XR_WIDTH && deviceWidth === XR_HEIGHT))
  );
}

// 获取头部高度
export const getStatusBarHeight = (androidBar = false) => {
  if (isAndroid()) {
    return androidBar ? StatusBar.currentHeight : 0;
  }
  if (isIos()) {
    if (androidBar) return 0;
    if (isIphoneX() || isIphoneXR()) {
      return 44;
    }
    return 20;
  }
};

// 获取头部填充高度
export function getHeaderPadding(androidBar = false) {
  if (isAndroid()) {
    return androidBar ? StatusBar.currentHeight : 0;
  }
  if (isIos()) {
    if (isIphoneX() || isIphoneXR()) {
      return 44;
    }
    return 20;
  }
}

// 获取头部高度
export function getHeaderHeight() {
  if (isAndroid()) {
    return 64;
  }
  if (isIos()) {
    if (isIphoneX() || isIphoneXR()) {
      return 88;
    }
    return 64;
  }
}

// 获取头部填充底部填充高度
export function getFooterBottom() {
  if (isAndroid()) {
    return 0;
  }
  if (isIos()) {
    if (isIphoneX() || isIphoneXR()) {
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
