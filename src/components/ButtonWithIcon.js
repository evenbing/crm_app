/**
 * @component ButtonWithIcon.js
 * @description 按钮Icon
 * @time 2018/6/24
 * @author JUSTIN XU
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../constants';

const Container = styled.TouchableOpacity`
  padding: 8px 8px;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  margin: 0 8px;
  font-size: 17px;
  color: ${props => props.color};
`;

export default class ButtonWithIcon extends PureComponent {
  state = {}

  render = () => {
    const {
      icon, title, color, onPress, reverse,
    } = this.props;
    return (
      <Container
        onPress={onPress}
        reverse={reverse}
      >
        {icon}
        <Title
          color={color}
        >
          {title}
        </Title>
      </Container>
    );
  }
}

ButtonWithIcon.defaultProps = {
  icon: null,
  title: null,
  color: theme.headerColor,
  onPress: () => {},
  reverse: false,
};

ButtonWithIcon.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  reverse: PropTypes.bool,
};
