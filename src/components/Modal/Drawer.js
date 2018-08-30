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
import { theme } from '../../constants';

const ModalView = styled(Modal)`
  margin: 0;
  justify-content: flex-end;
  flex-direction: row;
`;

const ContainerView = styled.View`
  width: ${props => (1 - props.openDrawerOffset) * 100}%;
  height: 100%;
  flex-direction: row;
  background-color: ${theme.whiteColor};
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
    } = this.props;
    return (
      <ModalView
        isVisible={isVisible}
        onBackdropPress={onPressClose}
        animationIn={animationIn}
        animationOut={animationOut}
        backdropColor={backdropColor}
        backdropOpacity={backdropOpacity}
      >
        <ContainerView
          openDrawerOffset={openDrawerOffset}
        >
          {content}
        </ContainerView>
      </ModalView>
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
};

export default Drawer;
