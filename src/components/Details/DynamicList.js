/**
 * @component DynamicList.js
 * @description DynamicList
 * @time 2018/8/12
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants/index';
import { moderateScale } from '../../utils/scale';

import DynamicItem from './DynamicItem';

const ContainerView = styled.View`
  padding-left: ${moderateScale(15)};
  padding-right: ${moderateScale(15)};
  flex-direction: row;
  background-color: #fff;
  padding-top: ${props => props.isFrist ? moderateScale(20) : 0};
`;

const LeftView = styled.View`
  flex-direction: row;
  width: ${moderateScale(50)};
  margin-right: ${moderateScale(3)};
  align-items: baseline;
`;
const MonthText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size:${moderateScale(12)};
  color: #494949;
  background-color: transparent;
`;
const DayText = styled.Text`
  font-family: ${theme.fontMedium};
  font-size: ${moderateScale(16)};
  color: #1F1F1F;
  background-color: transparent;
`;
const RightView = styled.View`
  flex: 1;
`;

class DynamicList extends React.PureComponent {
  renderRight = () => {
    const {
      item: { list = [] },
    } = this.props;
    if (!list.length) return null;
    return list.map(item => <DynamicItem key={item.id} item={item} />);
  };
  render() {
    const {
      onPress,
      item,
      index,
    } = this.props;
    return (
      <ContainerView onPress={onPress} isFrist={index === 0}>
        {
          item.type === 1 ? <LeftView><DayText>今天</DayText></LeftView> : (
            <LeftView>
              <MonthText>{item.nextMonth}月</MonthText>
              <DayText>{item.nextDay}</DayText>
            </LeftView>
          )
        }
        <RightView>
          {this.renderRight()}
        </RightView>
      </ContainerView>
    );
  }
}

DynamicList.defaultProps = {
  item: {},
  onPress: () => null,
  index: 0,
};

DynamicList.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  onPress: PropTypes.func,
  index: PropTypes.number,
};

export default DynamicList;
