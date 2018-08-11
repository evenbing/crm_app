/**
 * @component ListItem.js
 * @description 列表条目组件
 * @time 2018/8/7
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants/index';

const ContainerView = styled.View`
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
  height: ${theme.moderateScale(88)};
  background-color: #ffffff;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
  flex: 1;
`;
const LeftView = styled.View`
 justify-content: center;
`;
const TitleView = styled.Text`
  font-size: ${theme.moderateScale(16)};
  font-family: ${theme.fontMedium};
  color: #4F4F4F ;
  margin-bottom: ${theme.moderateScale(10)};
`;
const TimeView = styled.Text`
  color: #A3A3A3;
`;
const BoardView = styled.View`
  position: absolute;
  bottom: 0;
  left: ${theme.moderateScale(15)};
  height: 1px;
  width: 100%;
  background-color: #EEEEEE;
`;
const RightView = styled.View`
  padding-left: ${theme.moderateScale(17)};
  justify-content: center;
  height: ${theme.moderateScale(36)};
  border-left-width: 1px;
  border-left-color: #F6F6F6;
`;
const RightText = styled.Text`
  color: ${props => props.color || theme.primaryColor}
`;

class ListItem extends React.PureComponent {
  renderLeft = () => {
    const {
      item: { title, tipList = [] },
      left,
    } = this.props;
    if (React.isValidElement(left)) return left;
    if (left === 'hidden') return null;
    return (
      <LeftView>
        <TitleView>{title}</TitleView>
        {
          (Array.isArray(tipList) && tipList.length) ?
            tipList.map(_ => (
              <TimeView key={_}>{_}</TimeView>
            )) : null
        }
      </LeftView>
    );
  };
  renderRight = () => {
    const {
      item: { status },
      right,
    } = this.props;
    if (React.isValidElement(right)) return right;
    if (right === 'hidden') return null;
    const bool = status === 1;
    return (
      <RightView>
        <RightText
          color={bool ? theme.primaryColor : '#5374C7'}
        >
          {bool ? '进行中' : '已计划'}
        </RightText>
      </RightView>
    );
  };
  render() {
    return (
      <ContainerView>
        {this.renderLeft()}
        {this.renderRight()}
        <BoardView />
      </ContainerView>
    );
  }
}

ListItem.defaultProps = {
  item: {},
  left: null,
  right: null,
};

ListItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  left: PropTypes.node,
  right: PropTypes.node,
};

export default ListItem;
