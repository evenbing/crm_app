/**
 * @component app
 * @description 入口文件
 * @time 2018/7/7
 * @author JUSTIN XU
 */
import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { Root } from 'native-base';
import RootModal from 'js-root-toast';
import getConfig from './config';
import { getPassportInfo } from './service/app';
import Navigator from './router';

import { routers } from './constants';

// utils
import Toast from './utils/toast';
import { init, getPassportId } from './utils/rpc';
import { nativeGoBack, getCurrRoutes } from './utils/base';
import { goBack, registerTopNavigator, reset } from './utils/navigationService';

// components
import XnLoading from './components/xnLoading';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  xnLoading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9,
    backgroundColor: '#fff',
  },
});

class App extends React.Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressAndroidBack);
    this.initApp();
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
  initApp = async () => {
    try {
      const config = await getConfig();
      init(config);
      const id = await getPassportId();
      const {
        errors: pwdErrors = [],
        passport: { tenantId, userId } = {},
      } = await getPassportInfo({ id });
      if (pwdErrors.length) throw new Error(pwdErrors[0].message);
      global.tenantId = tenantId;
      global.userId = userId;
      await this.setState({ loading: false });
      reset(routers.tabView);
    } catch (e) {
      Toast.showError(e.message);
    }
  };

  render() {
    return (
      <View style={styles.root}>
        {
          this.state.loading ? (
            <View style={styles.xnLoading}>
              <XnLoading />
            </View>
          ) : null
        }
        <Root>
          <Navigator
            ref={(navigatorRef) => {
              this.navigatorRef = navigatorRef;
              registerTopNavigator(navigatorRef);
            }}
            onNavigationStateChange={() => {
              global.$RootToast && RootModal.hide(global.$RootToast);
            }}
            {...this.props}
          />
        </Root>
      </View>
    );
  }
}

export default App;
