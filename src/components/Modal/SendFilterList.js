/**
 * @component SendFilterList.js
 * @description 筛选 modal
 * @time 2018/9/3
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { theme } from '../../constants';
import { moderateScale } from '../../utils/scale';

// components
import TouchableView from '../../components/TouchableView';
import Thumbnail from '../../components/Thumbnail';

const ModalView = styled(Modal)`
  margin-top: ${props => theme.moderateScale(props.myMarginTop)};
  margin-bottom: ${props => theme.moderateScale(props.myMarginBottom)};
  margin-left: 0;
  margin-right: 0;
  flex-direction: ${props => props.myFlexDirection};
`;

const ContainerView = styled.View`
  background-color: ${theme.whiteColor};
`;

const DropBackView = styled(TouchableView)`
  flex: 1;
  background-color: #000000;
  opacity: .5;
`;

const ItemPressView = styled(TouchableView)`
  padding: 0 ${moderateScale(16)}px;
  height: ${moderateScale(44)};
  border-bottom-width: ${props => props.isLast ? '0px' : '1px'};
  border-style: solid;
  border-bottom-color: ${props => props.isLast ? 'transparent' : theme.borderColor};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemText = styled.Text`
  color: ${theme.textColor};
  font-size: ${moderateScale(16)};
`;

class SendFilterList extends React.PureComponent {
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
        key={`${item.leftText}`}
        isLast={index === len}
        onPress={() => {
          onPressClose();
          onPressItem({ index, item });
        }}
      >
        { this.getEleme(item.leftText, item.leftStyle) }
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
      marginTop,
      marginBottom,
      flexDirection,
      style,
    } = this.props;
    return (
      <ModalView
        animationType="fade"
        isVisible={isVisible}
        onBackdropPress={onPressClose}
        backdropOpacity={0}
        myMarginTop={marginTop}
        myMarginBottom={marginBottom}
        myFlexDirection={flexDirection}
        style={style}
      >
        <ContainerView>
          {this.renderItem()}
        </ContainerView>
        <DropBackView onPress={onPressClose} />
      </ModalView>
    );
  }
}

SendFilterList.defaultProps = {
  isVisible: false,
  selectedIndex: 0,
  onPressClose: () => null,
  onPressItem: () => null,
  list: [],
  marginTop: 0,
  marginBottom: 0,
  flexDirection: 'column',
  style: {},
};

SendFilterList.propTypes = {
  isVisible: PropTypes.bool,
  selectedIndex: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  flexDirection: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  onPressClose: PropTypes.func,
  onPressItem: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.any),
};

export default SendFilterList;
