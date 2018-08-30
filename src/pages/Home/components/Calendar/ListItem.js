import React from 'react';
import styled from 'styled-components';
import { moderateScale } from '../../../../utils/scale';
import { theme } from '../../../../constants';

const Container = styled.TouchableOpacity`
  width: ${props => props.ListItemWidth};
  align-items: center;
`;

const WeekText = styled.Text`
  height: ${moderateScale(23)}px;
  text-align: center;
  line-height: 20;
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

const WeekDayText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${theme.textWeekDayColor};
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
        <WeekDayText>{weekDay}</WeekDayText>
      </WeekDayView>
    </Container>
  );
};

export default ListItem;
