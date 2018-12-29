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
import { TouchableView } from 'xn-react-native-applets';

// utils
import { goBack } from 'utils/navigationService';
import { moderateScale } from 'utils/scale';

const ContainerView = styled.View`
  flex-direction: row;
  flex: 1;
`;

const ImageIcon = styled.Image`
  width: ${moderateScale(9)};
  height: ${moderateScale(16)};
`;

class LeftBackIcon extends React.PureComponent {
  render() {
    const {
      props: { onPress },
    } = this;
    return (
      <ContainerView>
        <TouchableView
          onPress={onPress || (() => goBack())}
          style={{
            paddingLeft: moderateScale(10),
            paddingRight: moderateScale(10),
            justifyContent: 'center',
          }}
        >
          <ImageIcon
            source={require('../../img/back-dark.png')}
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
