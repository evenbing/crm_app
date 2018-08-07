/**
 * @component ListItem.js
 * @description 客户列表条目组件
 * @time 2018/8/7
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

const ContainerView = styled.View`
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
  height: ${theme.moderateScale(88)};
  background-color: #ffffff;
  justify-content: center;
  position: relative;
  flex: 1;
`;
const TitleView = styled.Text`
  font-size: ${theme.moderateScale(16)};
  font-family: ${theme.fontMedium};
  color: #4F4F4F ;
`;
const TimeView = styled.Text`
  margin-top: ${theme.moderateScale(10)};
  color: #A3A3A3;
`;
const BoardView = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  width: 100%;
  background-color: #EEEEEE;
`;

class ListItem extends React.PureComponent {
  render() {
    const {
      item,
    } = this.props;
    return (
      <ContainerView>
        <TitleView>{item.name}</TitleView>
        <TimeView>{item.time}</TimeView>
        <BoardView />
      </ContainerView>
    );
  }
}

ListItem.defaultProps = {
  item: {},
};

ListItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};

export default ListItem;
