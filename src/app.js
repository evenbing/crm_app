/**
 * @component app
 * @description 入口文件
 * @time 2018/7/7
 * @author JUSTIN XU
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { init, getPassportId } from './utils/rpc';
import getConfig from './config';
import AppService from './service/AppService';

import XnLoading from './components/xnLoading';
import Toast from './utils/toast';
// import { HomeStack as Navigator } from './router';
import Navigator from './router';
import { getFooterBottom } from './utils/utils';

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
    paddingBottom: getFooterBottom(),
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentWillMount() {
    // this.initApp();
  }
  initApp = async () => {
    try {
      const config = await getConfig();
      init(config);
      // const id = '1015609398284128256'; // dev env passportId
      const id = await getPassportId();
      const {
        errors: pwdErrors,
        passport: { tenantId, userId } = {},
      } = await AppService.getPassportInfo({ id });
      if (pwdErrors == null || pwdErrors.length > 0) {
        throw new Error(pwdErrors[0].message);
      }
      global.tenantId = tenantId;
      global.userId = userId;
      const {
        errors: userErrors,
        result = [],
      } = await AppService.getShoppingGuideInfo({
        userId,
        tenantId,
      });
      if (userErrors == null || userErrors.length > 0) {
        throw new Error(userErrors[0].message);
      }
      const { id: guideUserId } = result[0] || {};
      if (!guideUserId) {
        throw new Error('没有此导购信息');
      }
      global.guideUserId = guideUserId;
      this.setState({ loading: false });
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
          ) : (
            <Navigator {...this.props} />
          )
        }
      </View>
    );
  }
}

export default App;
