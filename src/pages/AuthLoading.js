/**
 * @component AuthLoading.js
 * @description 处理权限页面
 * @time 2018/10/30
 * @author JUSTIN XU
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// constants
import CommStatusBar from '../components/Layout/CommStatusBar';
import XnLoading from '../components/xnLoading';

const ContainerView = styled.View`
  flex: 1;
  background-color: #fff;
`;


class AuthLoading extends React.Component {
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
