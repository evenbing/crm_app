/**
 * @component LabelItem.js
 * @description 字段条目
 * @time 2018/9/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableView, Thumbnail } from 'xn-react-native-applets';

import { theme } from 'constants';

const ContainerView = styled.View`
  position: relative;
`;

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

const HeaderAddItemView = styled.View`
  border: 1px solid #EFEFEF;
  overflow: hidden;
  background-color: ${theme.whiteColor};
  margin-left: ${theme.moderateScale(8)}px;
  margin-top: ${theme.moderateScale(11)}px;
  margin-bottom: ${theme.moderateScale(9)}px;
  border-radius: ${theme.moderateScale(4)}px;
`;

const HeaderAddItem = styled(TouchableView)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0 ${theme.moderateScale(13)}px;
  height: ${theme.moderateScale(22)}px;
  justify-content: center;
`;

const HeaderAddLabelText = HeaderLabelText.extend`
  padding-left: ${theme.moderateScale(2)}px;
`;

const DeleteItemView = styled(TouchableView)`
  position: absolute;
  width: ${theme.moderateScale(14)};
  height: ${theme.moderateScale(14)};
  top: ${theme.moderateScale(5)};
  right: ${-theme.moderateScale(5)};
`;

class LabelItem extends React.PureComponent {
  render() {
    const {
      item,
      active,
      showRemove,
      isLast,
      onPress,
      onPressAddItem,
      onPressRemoveItem,
    } = this.props;
    // 客户相关
    if (showRemove && isLast) {
      return (
        <HeaderAddItemView>
          <HeaderAddItem onPress={onPressAddItem}>
            <Thumbnail
              source={require('../../img/add.png')}
              size={14}
            />
            <HeaderAddLabelText>{item.name}</HeaderAddLabelText>
          </HeaderAddItem>
        </HeaderAddItemView>
      );
    }
    return (
      <ContainerView>
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
        {
          showRemove ? (
            <DeleteItemView onPress={onPressRemoveItem}>
              <Thumbnail
                source={require('../../img/drawer/delete-filter.png')}
                size={14}
              />
            </DeleteItemView>
          ) : null
        }

      </ContainerView>
    );
  }
}

LabelItem.defaultProps = {
  item: {},
  active: false,
  showRemove: false,
  isLast: false,
  onPress: () => null,
  onPressAddItem: () => null,
  onPressRemoveItem: () => null,
};

LabelItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  active: PropTypes.bool,
  showRemove: PropTypes.bool,
  isLast: PropTypes.bool,
  onPress: PropTypes.func,
  onPressAddItem: PropTypes.func,
  onPressRemoveItem: PropTypes.func,
};

export default LabelItem;
