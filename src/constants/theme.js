/**
 * @component theme.js
 * @description 主题
 * @time 2018/7/30
 * @author JUSTIN XU
 */
import { Easing, Animated } from 'react-native';
import { moderateScale } from '../utils/scale';

export default {
  primaryColor: '#18B548',
  whiteColor: '#FFFFFF',
  headerBackgroundColor: '#333333',
  dangerColor: '#D32E2B',
  headerColor: '#333238',
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
  // transition config
  transitionConfig: () => {
    return {
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: (sceneProps) => {
        const { position, layout, scene, index, scenes } = sceneProps;
        const toIndex = index;
        const thisSceneIndex = scene.index;
        const {
          initHeight: height,
          initWidth: width,
        } = layout || {};

        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [width, 0, 0],
        });

        // Since we want the card to take the same amount of time
        // to animate downwards no matter if it's 3rd on the stack
        // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
        const translateY = position.interpolate({
          inputRange: [0, thisSceneIndex],
          outputRange: [height, 0],
        });

        const slideFromRight = { transform: [{ translateX }] };
        const slideFromBottom = { transform: [{ translateY }] };

        const lastSceneIndex = scenes[scenes.length - 1].index;

        // Test whether we're skipping back more than one screen
        // and slide from bottom if true
        if (lastSceneIndex - toIndex > 1) {
          // Do not transoform the screen being navigated to
          if (scene.index === toIndex) return;
          // Hide all screens in between
          if (scene.index !== lastSceneIndex) return { opacity: 0 };
          // Slide top screen down
          return slideFromBottom;
        }
        // Otherwise slide from right
        return slideFromRight;
      },
    };
  },
};
