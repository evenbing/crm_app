/**
 * @component Accordion.js
 * @description 手风琴组件
 * @time 2018/8/11
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../constants';

// components
import TouchableView from './TouchableView';

const ContainerView = styled.View``;

const HeaderView = styled(TouchableView)`
  height: ${theme.moderateScale(44)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.moderateScale(15)}px;
  background-color: ${theme.whiteColor}
  position: relative;
`;

const LeftView = styled.View``;

const LeftText = styled.Text`
  font-family: ${theme.fontRegular};
  color: ${theme.listTitleColor};
`;

const RightView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RightUnit = styled.Text`
  font-size: ${theme.moderateScale(12)};
  color: ${theme.listTipColor};
`;

const RightText = styled.Text`
  font-size: ${theme.moderateScale(12)};
  font-family: ${theme.fontRegular};
  color: ${theme.listTipColor};
`;

const RightIcon = styled.View`
  margin-left: ${theme.moderateScale(11)};
  width: ${theme.moderateScale(14)};
  height: ${theme.moderateScale(14)};
  background-color: ${props => props.backgroundColor || 'red'};
`;

const BoardView = styled.View`
  position: absolute;
  bottom: 0;
  left: ${theme.moderateScale(15)};
  height: 1px;
  width: 100%;
  background-color: ${theme.borderColor};
`;

const SectionView = styled.View``;

class Accordion extends React.PureComponent {
  render() {
    const {
      showMain,
      children,
      left,
      rightUnit,
      right,
      onPress,
    } = this.props;
    return (
      <ContainerView>
        <HeaderView onPress={onPress}>
          <LeftView>
            <LeftText>{left}</LeftText>
          </LeftView>
          <RightView>
            <RightUnit>{rightUnit}</RightUnit>
            <RightText>{right}</RightText>
            <RightIcon backgroundColor={showMain && 'blue'} />
          </RightView>
          <BoardView />
        </HeaderView>
        <SectionView>
          {showMain ? children : null}
        </SectionView>
      </ContainerView>
    );
  }
}

Accordion.defaultProps = {
  children: null,
  showMain: false,
  left: null,
  rightUnit: '¥',
  right: null,
  onPress: () => null,
};

Accordion.propTypes = {
  children: PropTypes.node,
  showMain: PropTypes.bool,
  left: PropTypes.string,
  rightUnit: PropTypes.string,
  right: PropTypes.string,
  onPress: PropTypes.func,
};

export default Accordion;
