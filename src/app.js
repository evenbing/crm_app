/**
 * @component app
 * @description 入口文件
 * @time 2018/7/7
 * @author JUSTIN XU
 */
import React from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { NativeUtil, RootToast } from 'xn-react-native-applets';
import Navigator from './router';

// utils
import { getCurrRoutes } from './utils/base';
import { goBack, registerTopNavigator } from './utils/navigationService';

const { nativeGoBack } = NativeUtil;

class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressAndroidBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressAndroidBack);
  }
  onPressAndroidBack = () => {
    const {
      state: {
        nav,
      } = {},
    } = this.navigatorRef;
    const currRoutes = getCurrRoutes(nav);
    const isRootPage = Array.isArray(currRoutes) && currRoutes.length === 1;
    if (isRootPage) {
      nativeGoBack();
      return true;
    }
    goBack();
    return true;
  };
  render() {
    return (
      <Root>
        <Navigator
          ref={(navigatorRef) => {
            this.navigatorRef = navigatorRef;
            registerTopNavigator(navigatorRef);
          }}
          onNavigationStateChange={() => {
            global.$RootToast && RootToast.hide(global.$RootToast);
          }}
          {...this.props}
        />
      </Root>
    );
  }
}

export default App;
