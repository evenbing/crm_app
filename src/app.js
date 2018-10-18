/**
 * @component app
 * @description 入口文件
 * @time 2018/7/7
 * @author JUSTIN XU
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import getConfig from './config';
import { getPassportInfo } from './service/app';

// utils
import Toast from './utils/toast';
import { init, getPassportId } from './utils/rpc';

// components
import XnLoading from './components/xnLoading';
import Navigator from './router';

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
    this.initApp();
  }
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
