/**
 * @component LeftBackIcon.jsx
 * @description 右侧返回
 * @time 2018/8/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { goBack } from '../../utils/navigationService';

import TouchableView from '../TouchableView';

const ContainerView = styled.View`
  flex-direction: row;
  flex: 1;
`;

const ImageIcon = styled.Image`
  width: 10px;
  height: 18px;
`;

class LeftBackIcon extends React.PureComponent{
  render() {
    const {
      props: { onPress },
    } = this;
    return (
      <ContainerView>
        <TouchableView
          onPress={onPress || (() => goBack())}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: 'center',
          }}
        >
          <ImageIcon
            source={require('../../img/back.png')}
            resizeMode="contain"
          />
        </TouchableView>
      </ContainerView>
    );
  }
}

LeftBackIcon.defaultProps = {
  onPress: null,
};

LeftBackIcon.propTypes = {
  onPress: PropTypes.func,
};


export default LeftBackIcon;
