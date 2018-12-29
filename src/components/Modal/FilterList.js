/**
 * @component FilterList.js
 * @description 筛选 modal
 * @time 2018/9/3
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RootModal from 'js-root-toast';
import { DevicesUtil, TouchableView, Thumbnail } from 'xn-react-native-applets';

// toast
import { theme } from 'constants';
import { moderateScale } from 'utils/scale';

const { deviceWidth, deviceHeight } = DevicesUtil;

const ContainerView = styled.View`
  background-color: ${theme.whiteColor};
`;

const ItemPressView = styled(TouchableView)`
  padding: 0 ${moderateScale(16)}px;
  height: ${moderateScale(44)};
  border-bottom-width: ${props => props.isLast ? '0px' : '1px'};
  border-bottom-color: ${props => props.isLast ? 'transparent' : theme.borderColor};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemText = styled.Text`
  color: ${theme.textColor};
  font-size: ${moderateScale(16)};
`;

class FilterList extends React.PureComponent {
  getEleme = (node, style) => {
    if (!node) return null;
    if (React.isValidElement(node)) {
      return node;
    }
    return (
      <ItemText
        style={style || {}}
      >
        {node}
      </ItemText>
    );
  };
  renderItem = () => {
    const {
      list,
      selectedIndex,
      onPressItem,
      onPressClose,
    } = this.props;
    if (!(list && list.length)) return null;
    const len = list.length - 1;
    return list.map((item, index) => (
      <ItemPressView
        key={`${item.name}`}
        isLast={index === len}
        onPress={() => {
          onPressClose();
          onPressItem({ index, item });
        }}
      >
        { this.getEleme(item.name, item.style) }
        {
          selectedIndex === index ? (
            <Thumbnail
              source={require('../../img/modal/ok.png')}
              size={18}
            />
          ) : null
        }
      </ItemPressView>
    ));
  };
  render() {
    const {
      isVisible,
      onPressClose,
      position,
      flexDirection,
    } = this.props;
    const rootModalProps = {
      visible: isVisible,
      position,
      duration: 0,
      opacity: 1,
      shadow: false,
      containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        flexDirection,
        width: deviceWidth,
        height: deviceHeight - (position > 0 ? position : -position),
        borderRadius: 0,
        padding: 0,
      },
      onHidden: onPressClose,
    };
    return (
      <RootModal {...rootModalProps}>
        <ContainerView>
          {this.renderItem()}
        </ContainerView>
      </RootModal>
    );
  }
}

FilterList.defaultProps = {
  isVisible: false,
  selectedIndex: 0,
  onPressClose: () => null,
  onPressItem: () => null,
  list: [],
  position: 0,
  flexDirection: 'column',
};

FilterList.propTypes = {
  isVisible: PropTypes.bool,
  selectedIndex: PropTypes.number,
  position: PropTypes.number,
  flexDirection: PropTypes.string,
  onPressClose: PropTypes.func,
  onPressItem: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.any),
};

export default FilterList;
