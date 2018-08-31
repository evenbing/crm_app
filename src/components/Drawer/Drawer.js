/**
 * @component Drawer.js
 * @description 抽屉组件
 * @time 2018/8/30
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { theme } from '../../constants/index';
import { getHeaderPadding, getFooterBottom } from '../../utils/utils';

const ContainerView = styled.View`
  flex: 1;
`;

const ModalView = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
  flex-direction: row;
`;

const ModalWrapperView = styled.View`
  width: ${props => (1 - props.openDrawerOffset) * 100}%;
  padding-top: ${getHeaderPadding() || 0};
  height: 100%;
  flex-direction: row;
  background-color: ${theme.whiteColor};
  padding-bottom: ${getFooterBottom() || 0};
`;

class Drawer extends React.PureComponent {
  render() {
    const {
      isVisible,
      onPressClose,
      content,
      animationIn,
      animationOut,
      openDrawerOffset,
      backdropColor,
      backdropOpacity,
      children,
    } = this.props;
    return (
      <ContainerView>
        <ModalView
          isVisible={isVisible}
          onBackdropPress={onPressClose}
          animationIn={animationIn}
          animationOut={animationOut}
          backdropColor={backdropColor}
          backdropOpacity={backdropOpacity}
        >
          <ModalWrapperView
            openDrawerOffset={openDrawerOffset}
          >
            {content}
          </ModalWrapperView>
        </ModalView>
        {children}
      </ContainerView>
    );
  }
}

Drawer.defaultProps = {
  isVisible: false,
  onPressClose: () => null,
  content: null,
  animationIn: 'slideInRight',
  animationOut: 'slideOutRight',
  openDrawerOffset: 0.179,
  backdropColor: 'black',
  backdropOpacity: 0.5,
  children: null,
};

Drawer.propTypes = {
  isVisible: PropTypes.bool,
  onPressClose: PropTypes.func,
  content: PropTypes.node,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  openDrawerOffset: PropTypes.number,
  backdropColor: PropTypes.string,
  backdropOpacity: PropTypes.number,
  children: PropTypes.node,
};

export default Drawer;
