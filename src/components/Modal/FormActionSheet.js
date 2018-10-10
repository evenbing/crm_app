/*
 * @Author: Edmond.Shi
 * @Date: 2018-09-20 13:36:45
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-20 15:05:42
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Modal from 'react-native-modal';
import { theme } from '../../constants';
import { moderateScale } from '../../utils/scale';
import { getFooterBottom } from '../../utils/utils';

// components
import TouchableView from '../../components/TouchableView';
import { HorizontalDivider } from '../../components/Styles/Divider';

const Container = styled.View``;

const ModalView = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
`;

const ContainerView = styled.View`
  padding-bottom: ${getFooterBottom() || 0};
`;

const ItemBasicView = css`
  padding: 0 ${moderateScale(16)}px;
  height: ${moderateScale(44)};
  border-bottom-width: ${props => props.isLast ? '0px' : '1px'};
  border-style: solid;
  border-bottom-color: ${props => props.isLast ? 'transparent' : theme.borderColor};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemPressView = styled(TouchableView)`
  ${ItemBasicView};
`;

const ItemListView = styled.View`
  background-color: ${theme.whiteColor};
`;

const ItemView = styled.View`
  ${ItemBasicView};
`;

const ItemText = styled.Text`
  color: ${theme.textColor};
  font-size: ${moderateScale(16)};
  width: 100%;
`;

const FooterView = styled(TouchableView)`
  height: ${moderateScale(49)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.whiteColor};
`;

const FooterText = styled.Text`
  color: ${theme.primaryColor};
  font-size: ${moderateScale(16)};
`;

class FormActionSheet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  onShowModal = () => {
    this.setState({ isVisible: true });
  }

  onHideModal = () => {
    this.setState({ isVisible: false });
  }

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

  getItemTextStyle = (key) => {
    switch (key) {
      case 'left':
        return ({ textAlign: 'left' });
      case 'right':
        return ({ textAlign: 'right' });
      default:
        return ({ textAlign: 'center' });
    }
  }

  renderItem = () => {
    const {
      typeEnum,
      itemNeedPress,
      onConfirm,
      location,
    } = this.props;
    const list = Object.keys(typeEnum);
    const len = list.length;
    if (len === 0) return;
    if (itemNeedPress) {
      return list.map((key, index) => {
        const value = typeEnum[key];
        return (
          <ItemPressView
            key={`${key}`}
            isLast={index === len - 1}
            onPress={() => {
              onConfirm({
                key,
                value,
                index,
              });
              this.onHideModal();
            }}
          >
            {this.getEleme(value, this.getItemTextStyle(location))}
          </ItemPressView>
        );
      });
    }
    return list.map((key, index) => {
      const value = typeEnum[key];
      return (
        <ItemView
          key={`${key}`}
          isLast={index === len - 1}
        >
          {this.getEleme(value, this.getItemTextStyle(location))}
        </ItemView>
      );
    });
  };

  renderFooter = () => (
    <FooterView
      onPress={this.onHideModal}
    >
      <FooterText>取消</FooterText>
    </FooterView>
  );

  render() {
    const {
      state: {
        isVisible,
      },
      props: {
        children,
      },
    } = this;
    return (
      <Container>
        <TouchableView onPress={this.onShowModal} >
          {children}
        </TouchableView>
        <ModalView
          animationType="fade"
          isVisible={isVisible}
          onBackdropPress={this.onHideModal}
        >
          <ContainerView>
            <ItemListView>
              {this.renderItem()}
            </ItemListView>
            <HorizontalDivider backgroundColor="transparent" />
            {this.renderFooter()}
          </ContainerView>
        </ModalView>
      </Container>
    );
  }
}

FormActionSheet.defaultProps = {
  location: 'middle',
  itemNeedPress: true,
};

FormActionSheet.propTypes = {
  location: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  typeEnum: PropTypes.instanceOf(Object).isRequired,
  itemNeedPress: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default FormActionSheet;
