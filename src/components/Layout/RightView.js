/**
 * @component RightView.js
 * @description 右侧容器
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

import TouchableView from '../TouchableView';

const ContainerView = styled.View`
  flex-direction: row;
  flex: 1;
`;

const RightText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: ${theme.headerColor};
  background-color: transparent;
`;

class RightView extends React.Component {
  renderText = () => {
    const {
      props: {
        right,
        rightStyle,
      },
    } = this;
    if (React.isValidElement(right)) return right;
    return (
      <RightText style={rightStyle}>{right}</RightText>
    );
  };
  render() {
    const {
      props: { onPress },
    } = this;
    return (
      <ContainerView>
        <TouchableView
          onPress={onPress}
          style={{
            paddingLeft: theme.moderateScale(15),
            paddingRight: theme.moderateScale(15),
            justifyContent: 'center',
          }}
        >
          {this.renderText()}
        </TouchableView>
      </ContainerView>
    );
  }
}

RightView.defaultProps = {
  onPress: () => null,
  right: null,
  rightStyle: {},
};

RightView.propTypes = {
  onPress: PropTypes.func,
  right: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  rightStyle: PropTypes.instanceOf(PropTypes.object),
};

export default RightView;
