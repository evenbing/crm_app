/*
 * @Author: ShiQuan
 * @Date: 2018-09-09 19:25:09
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-09 19:50:30
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import NoticeView from './NotiveView';
import { moderateScale } from '../../../utils/scale';
import CalendarIcon from '../../../img/home/ico_header_calendar.png';
import { getDayOfWeek } from '../../../utils/date';

const HeaderView = styled.View`
  height: ${moderateScale(134)};
  padding-top: ${moderateScale(9)};
  padding-bottom: ${moderateScale(30)};
  flex-direction: row;
  padding-left: ${moderateScale(15)};
  padding-right: ${moderateScale(15)};
`;

const HeaderViewLeft = styled.View``;

const HeaderCalendarIcon = styled.Image.attrs({
  source: CalendarIcon,
})`
  width: ${moderateScale(79)}px;
  height: ${moderateScale(79)}px;
`;

const HeaderCalendarText = styled.Text.attrs({
  numberOfLines: 1,
})`
  width: ${moderateScale(79)}px;
  color: white;
  background-color: transparent;
  position: absolute;
  text-align: center;
  bottom: ${moderateScale(20)};
  font-size: ${moderateScale(35)};
`;

const HeaderViewMiddle = styled.View`
  flex: 1;
  margin-top: ${moderateScale(19)};
  margin-left: ${moderateScale(12)}px;
`;

const YearAndMonth = styled.Text`
  color: white;
  background-color: transparent;
  font-size: ${moderateScale(18)};
  margin-bottom: ${moderateScale(10)};
`;

const WeekDay = styled.Text`
  color: white;
  background-color: transparent;
  font-size: ${moderateScale(18)};
`;

const HeaderViewRight = styled.View`
  padding-top: ${moderateScale(10)};
`;

const TodayView = ({ showMessageList }) => {
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 1;
  const curDay = new Date().getDate();
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1.0, y: 1.0 }}
      colors={['#169C58', '#8EC963']}
    >
      <HeaderView>
        <HeaderViewLeft>
          <HeaderCalendarIcon />
          <HeaderCalendarText>
            {curDay}
          </HeaderCalendarText>
        </HeaderViewLeft>
        <HeaderViewMiddle>
          <YearAndMonth>{`${curYear}年${curMonth}月`}</YearAndMonth>
          <WeekDay> {getDayOfWeek(curYear, curMonth, curDay, '星期')} </WeekDay>
        </HeaderViewMiddle>
        <HeaderViewRight>
          <NoticeView yes onPress={showMessageList} />
        </HeaderViewRight>
      </HeaderView>
    </LinearGradient>
  );
};

TodayView.propTypes = {
  showMessageList: PropTypes.func.isRequired,
};

export default TodayView;
