/**
 * @component TitleItem.js
 * @description 条目头部
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

const ContainerView = styled.View`
  height: ${theme.moderateScale(44)};
  padding: 0 ${theme.moderateScale(15)}px;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.titleBackColor || 'transparent'};
`;

const HeaderTitleText = styled.Text`
  color: ${props => props.color || theme.primaryColor};
  font-size: ${props => theme.moderateScale(props.fontSize)};
`;

class TitleItem extends React.PureComponent {
  render() {
    const {
      color,
      fontSize,
      titleStyle,
      text,
      titleBackColor,
    } = this.props;
    return (
      <ContainerView titleBackColor={titleBackColor} >
        <HeaderTitleText
          color={color}
          fontSize={fontSize}
          style={titleStyle}
        >
          {text}
        </HeaderTitleText>
      </ContainerView>
    );
  }
}

TitleItem.defaultProps = {
  color: null,
  titleStyle: {},
  text: null,
  fontSize: 14,
};

TitleItem.propTypes = {
  color: PropTypes.string,
  titleStyle: PropTypes.objectOf(PropTypes.any),
  text: PropTypes.string,
  fontSize: PropTypes.number,
};

export default TitleItem;
