import { Platform, Dimensions, StatusBar } from 'react-native';
/**
 * device info
 */
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;

export const isAndroid = platform === 'android';

/**
 * check if device is iphone X
 */
export const isIphoneX = () => platform === 'ios' && deviceHeight === 812 && deviceWidth === 375;

/**
 * get header Tool Bar height
 */
export const getToolBarHeight = () => {
  if (platform === 'ios') {
    if (isIphoneX()) {
      return 89;
    }
    return 64;
  }
  return 56;
};

/**
 * get footer (action bar , tab bar .etc) height
 */
export const getFooterHeight = () => {
  if (isIphoneX()) {
    return 89;
  }
  return 55;
};

export const getBottomPadding = () => {
  if (isIphoneX()) {
    return 34;
  }
  return 0;
};

/**
 * get StatusBar Height
 */
export const getStatusBarHeight = () => {
  if (platform === 'ios') {
    if (isIphoneX()) {
      return 44;
    }
    return 20;
  }
  return StatusBar.currentHeight;
};
