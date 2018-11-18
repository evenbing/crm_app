/**
 * @component AuthLoading.js
 * @description 处理权限页面
 * @time 2018/10/30
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getConfig from '../config';
import routers from '../constants/routers';

// utils
import { getPassportId, init } from '../utils/rpc';
import { reset } from '../utils/navigationService';
import Toast from '../utils/toast';

// constants
import CommStatusBar from '../components/Layout/CommStatusBar';
import XnLoading from '../components/xnLoading';

import { getPassportInfo } from '../service/app';

const ContainerView = styled.View`
  flex: 1;
  background-color: #fff;
`;

class AuthLoading extends React.Component {
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
      reset(routers.tabView);
    } catch (e) {
      Toast.showError(e.message);
    }
  };
  render() {
    return (
      <ContainerView>
        <CommStatusBar
          barStyle="dark-content"
        />
        <XnLoading />
      </ContainerView>
    );
  }
}

AuthLoading.defaultProps = {};

AuthLoading.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    getParam: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default AuthLoading;
