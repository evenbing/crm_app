/**
 * @component LabelItem.js
 * @description 字段条目
 * @time 2018/9/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

// components
import TouchableView from '../TouchableView';

const HeaderLabelItem = styled.View`
  padding: 0 ${theme.moderateScale(13)}px;
  height: ${theme.moderateScale(22)}px;
  background-color: ${props => props.active ? '#B4E8C4' : '#EFEFEF'};
  border-radius: ${theme.moderateScale(4)}px;
  margin-left: ${theme.moderateScale(8)}px;
  margin-top: ${theme.moderateScale(11)}px;
  margin-bottom: ${theme.moderateScale(9)}px;
  align-items: center;
  justify-content: center;
`;

const HeaderLabelText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: ${theme.moderateScale(13)}px;
  color: ${props => props.active ? theme.primaryColor : '#4D4D4D'};
`;

class LabelItem extends React.PureComponent {
  render() {
    const {
      item,
      active,
      onPress,
    } = this.props;
    return (
      <TouchableView onPress={onPress}>
        <HeaderLabelItem
          active={active}
        >
          <HeaderLabelText
            active={active}
          >
            {item.name}
          </HeaderLabelText>
        </HeaderLabelItem>
      </TouchableView>
    );
  }
}

LabelItem.defaultProps = {
  item: {},
  active: false,
  onPress: () => null,
};

LabelItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  active: PropTypes.bool,
  onPress: PropTypes.func,
};

export default LabelItem;
