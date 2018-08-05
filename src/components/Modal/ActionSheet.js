/**
 * @component ActionSheet.js
 * @description 弹层modal
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Modal from 'react-native-modal';
import { theme } from '../../constants';

// components
import TouchableView from '../../components/TouchableView';
import { HorizontalDivider } from '../../components/Styles/Divider';

const ModalView = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
`;

const ContainerView = styled.View`
`;

const ItemBasicView = css`
  padding: 0 16px;
  height: 44px;
  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color: ${props => props.isLast ? 'transparent' : theme.borderColor};
  background-color: #FFFFFF;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemPressView = styled(TouchableView)`
  ${ItemBasicView};
`;

const ItemView = styled.View`
  ${ItemBasicView};
`;

const ItemText = styled.Text`
  color: ${theme.textColor};
  font-size: 16px;
`;

const FooterView = styled(TouchableView)`
  height: 49px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
`;

const FooterText = styled.Text`
  color: ${theme.primaryColor};
  font-size: 16px;
`;

class ActionSheet extends React.PureComponent {
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
  }
  renderItem = () => {
    const {
      list,
      onPressItem,
      onPressClose,
      itemNeedPress,
    } = this.props;
    if (!(list && list.length)) return null;
    const len = list.length - 1;
    if (itemNeedPress) {
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
          { this.getEleme(item.rightText, item.rightStyle) }
        </ItemPressView>
      ));
    }
    return list.map((item, index) => (
      <ItemView
        key={`${item.leftText}`}
        isLast={index === len}
      >
        { this.getEleme(item.leftText, item.leftStyle) }
        { this.getEleme(item.rightText, item.rightStyle) }
      </ItemView>
    ));
  };
  renderFooter = () => (
    <FooterView
      onPress={this.props.onPressClose}
    >
      <FooterText>取消</FooterText>
    </FooterView>
  );
  render() {
    const {
      isVisible,
      onPressClose,
    } = this.props;
    return (
      <ModalView
        isVisible={isVisible}
        onBackdropPress={onPressClose}
      >
        <ContainerView>
          {this.renderItem()}
          <HorizontalDivider />
          {this.renderFooter()}
        </ContainerView>
      </ModalView>
    );
  }
}

ActionSheet.defaultProps = {
  isVisible: false,
  itemNeedPress: true,
  onPressClose: () => null,
  onPressItem: () => null,
  list: [],
};

ActionSheet.propTypes = {
  isVisible: PropTypes.bool,
  itemNeedPress: PropTypes.bool,
  onPressClose: PropTypes.func,
  onPressItem: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.any),
};

export default ActionSheet;
