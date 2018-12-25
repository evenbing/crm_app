import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { moderateScale } from '../../../../utils/scale';
import { theme } from '../../../../constants';

const Container = styled.TouchableOpacity`
  width: ${props => props.ListItemWidth};
  align-items: center;
`;

const WeekText = styled.Text.attrs({
  numberOfLines: 1,
})`
  height: ${moderateScale(23)}px;
  text-align: center;
  line-height: ${moderateScale(18)}px;
  margin-bottom: ${moderateScale(15)}px;
  color: ${theme.textWeekColor};
  font-size: ${moderateScale(14)}px;
`;

const WeekDayView = styled.View`
  width: ${moderateScale(23)}px;
  height: ${moderateScale(23)}px;
  ${props => props.selected && `background-color: ${theme.primaryColor};`}
  ${props => props.selected && `border-radius: ${moderateScale(11.5)}px;`}
  justify-content: center;
  align-items: center;
`;

const WeekDayText = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${moderateScale(14)}px;
  color: ${props => props.selected ? theme.whiteColor : theme.textWeekDayColor};
`;

const ListItem = ({
  item,
  ListItemWidth,
}) => {
  const {
    key,
    selected,
    week,
    weekDay,
    onPress,
  } = item;
  return (
    <Container
      ListItemWidth={ListItemWidth}
      onPress={onPress(key)}
    >
      <WeekText>{week}</WeekText>
      <WeekDayView selected={selected}>
        <WeekDayText selected={selected}>{weekDay}</WeekDayText>
      </WeekDayView>
    </Container>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    selected: PropTypes.bool,
    week: PropTypes.string,
    weekDay: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    onPress: PropTypes.func,
  }).isRequired,
  ListItemWidth: PropTypes.number.isRequired,
};

export default ListItem;
