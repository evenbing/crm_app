import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import { getMonthDays, getDayOfWeek, get2Date } from '../../../../utils/date';
import { moderateScale, width } from '../../../../utils/scale';
import theme from '../../../../constants/theme';
import LeftArrow from '../../../../img/home/ico_left_arrow.png';
import RightArrow from '../../../../img/home/ico_right_arrow.png';
import CreateIcon from '../../../../img/home/create.png';
import ListItem from './ListItem';
import { routers } from '../../../../constants';

const ListItemWidth = (width - moderateScale(60)) / 7;

const Container = styled.View`
  margin: -${moderateScale(30)}px ${moderateScale(15)}px 0px ${moderateScale(15)}px;
  background-color: ${theme.whiteColor};
  height: ${moderateScale(126)};
  border-radius: ${moderateScale(4)};
  padding: ${moderateScale(18)}px ${moderateScale(15)}px ${moderateScale(8)}px ${moderateScale(15)}px;
`;

const UpView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UpLeftView = styled.View`
  /* width: ${moderateScale((width - 30 - 30 - 2) / 3)}px; */
  flex: 1;
  height: ${moderateScale(26)}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const YearButton = styled.TouchableOpacity`
  padding: ${moderateScale(5)}px;
`;

const YearText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${theme.primaryColor};
`;

const UpMiddleView = styled.View`
  /* width: ${moderateScale((width - 30 - 30 - 2) / 3)}px; */
  flex: 1;
  height: ${moderateScale(26)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MonthArrow = styled.TouchableOpacity`
  padding:${moderateScale(5)}px;
`;

const MonthArrowIcon = styled.Image`
  height: ${moderateScale(13.8)}px;
  width: ${moderateScale(8.5)}px;
`;

const MonthText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${theme.textColor};
`;

const UpRightView = styled.View`
  flex: 1;
  height: ${moderateScale(26)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TodayButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  background-color: ${theme.primaryColor};
  border-radius: ${moderateScale(12)}px;
  margin-left: ${moderateScale(20.4)}px;
`;

const TodayButtonText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${theme.whiteColor};
`;

const CreateButton = styled.TouchableOpacity``;

const CreateButtonIcon = styled.Image.attrs({
  source: CreateIcon,
})`
  width: ${moderateScale(21.2)};
  height: ${moderateScale(25.4)};
`;

const MiddleView = styled.View`
  height: ${moderateScale(23)}px;
  background-color: ${theme.pageBackColor};
  border-radius: ${moderateScale(11.5)}px;
  margin-top: ${moderateScale(13)}px;
`;

const DownView = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-top: ${0 - moderateScale(23)}px;
  background-color: transparent;
`;

class Calendar extends Component {
  constructor(props) {
    super(props);
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth() + 1;
    const curDay = new Date().getDate();
    this.state = {
      year: curYear,
      month: curMonth,
      day: curDay,
      data: this.generateDays(curYear, curMonth, curDay),
    };
  }

  componentDidMount() {
    // this.scrollToIndex(10);
  }

  onSelectDay = key => () => {
    const newData = this.state.data.map(item => ({
      ...item,
      selected: item.key === key,
    }));
    const { weekDay } = this.state.data.filter(item => item.key === key)[0];
    this.setState({
      data: newData,
      day: weekDay,
    });
    const { onSelectedDayChange } = this.props;
    const { year, month } = this.state;
    onSelectedDayChange && onSelectedDayChange(`${year}${get2Date(month)}${get2Date(weekDay)}`);
  }

  onSelectYear = (year) => {
    if (year !== this.state.year) {
      const { onSelectedDayChange } = this.props;
      onSelectedDayChange && onSelectedDayChange(`${year}0101`);

      this.setState({
        year,
        month: 1,
        day: 1,
        data: this.generateDays(year, 1),
      }, () => { this.scrollToIndex(0); });
    }
  }

  onScrollEndDrag = (event) => {
    const contentWidth = event.nativeEvent.contentSize.width;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    if (contentOffsetX <= 0) {
      let newYear = this.state.year;
      let newMonth = this.state.month;
      if (this.state.month === 1) {
        newMonth = 12;
        newYear = this.state.year - 1;
      } else {
        newMonth -= 1;
      }
      this.setState({
        year: newYear,
        month: newMonth,
        day: getMonthDays(newYear, newMonth),
        data: this.generateDays(newYear, newMonth, getMonthDays(newYear, newMonth)),
      }, () => {
        this.scrollToIndex(getMonthDays(newYear, newMonth) - 7, 0);
      });
    } else if (contentWidth - contentOffsetX > 7 * ListItemWidth) {
      this.scrollToIndex(this.getIndex(contentOffsetX), 0);
    } else {
      let newYear = this.state.year;
      let newMonth = this.state.month;
      let newDay = this.state.day;
      if (this.state.month < 12) {
        newMonth += 1;
        newDay = 1;
      } else {
        newMonth = 1;
        newYear += 1;
        newDay = 1;
      }
      const { onSelectedDayChange } = this.props;
      onSelectedDayChange && onSelectedDayChange(`${newYear}${get2Date(newMonth)}01`);
      this.setState({
        year: newYear,
        month: newMonth,
        day: newDay,
        data: this.generateDays(newYear, newMonth),
      }, () => {
        this.scrollToIndex(0, 0);
      });
    }
  }

  getIndex = (endX) => {
    const yushu = endX % ListItemWidth;
    const count = parseInt(endX / ListItemWidth, 10);
    if (yushu >= (ListItemWidth * 0.4)) {
      return count + 1;
    }
    return count;
  }

  getItemLayout = (data, index) => (
    { length: ListItemWidth, offset: ListItemWidth * index, index }
  )

  getInitialScrollIndex = (day = this.state.day, month = this.state.month, year = this.state.year) => {
    const curDayCount = getMonthDays(year, month);
    if (day > 4 && day < curDayCount - 3) {
      return day - 4;
    } else if (day <= 4) {
      return 0;
    }
    return curDayCount - 7;
  }

  goToday = () => {
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth() + 1;
    const curDay = new Date().getDate();
    if (curYear === this.state.year && curMonth === this.state.month && curDay === this.state.day) {
      this.scrollToIndex(this.getInitialScrollIndex(curDay));
    } else {
      const { onSelectedDayChange } = this.props;
      onSelectedDayChange && onSelectedDayChange(`${curYear}${get2Date(curMonth)}${get2Date(curDay)}`);
      this.setState({
        year: curYear,
        month: curMonth,
        day: curDay,
        data: this.generateDays(curYear, curMonth, curDay),
      }, () => {
        this.scrollToIndex(this.getInitialScrollIndex(curDay), 0);
      });
    }
  }

  generateDays = (year, month, selectedDay = 1) => {
    const count = getMonthDays(year, month);
    const days = [];
    for (let index = 1; index <= count; index++) {
      days.push({
        key: uuidv1(),
        onPress: this.onSelectDay,
        selected: selectedDay === index,
        week: getDayOfWeek(year, month, index),
        weekDay: `${index}`,
      });
    }
    return days;
  }

  generateKeyExtractor = item => item.key;

  monthSubtracte = () => {
    let newYear = this.state.year;
    let newMonth = this.state.month;
    let newDay = this.state.day;
    if (this.state.month > 1) {
      newMonth -= 1;
      newDay = 1;
    } else {
      newMonth = 12;
      newYear -= 1;
      newDay = 1;
    }
    const { onSelectedDayChange } = this.props;
    onSelectedDayChange && onSelectedDayChange(`${newYear}${get2Date(newMonth)}01`);

    this.setState({
      year: newYear,
      month: newMonth,
      day: newDay,
      data: this.generateDays(newYear, newMonth),
    }, () => { this.scrollToIndex(0, 0); });
  }

  monthAdd = () => {
    let newYear = this.state.year;
    let newMonth = this.state.month;
    let newDay = this.state.day;
    if (this.state.month < 12) {
      newMonth += 1;
      newDay = 1;
    } else {
      newMonth = 1;
      newYear += 1;
      newDay = 1;
    }
    const { onSelectedDayChange } = this.props;
    onSelectedDayChange && onSelectedDayChange(`${newYear}${get2Date(newMonth)}01`);

    this.setState({
      year: newYear,
      month: newMonth,
      day: newDay,
      data: this.generateDays(newYear, newMonth),
    }, () => { this.scrollToIndex(0, 0); });
  }

  scrollToIndex = (index, viewPosition = 0.5) => {
    if (index < 0) return;
    this.flatListRef.scrollToIndex({
      animated: true,
      index,
      viewOffset: 0,
      viewPosition,
    });
  }

  renderItem = ListItemWidth => ({ item }) => (
    <ListItem
      item={item}
      ListItemWidth={ListItemWidth}
    />
  )

  render() {
    const {
      year,
      month,
    } = this.state;
    const {
      navigate,
      selectCreateType,
    } = this.props;
    return (
      <Container>
        <UpView>
          <UpLeftView>
            <YearButton onPress={() => navigate(routers.selectYear, {
              onSelectYear: this.onSelectYear,
              selectedYear: year,
            })}
            >
              <YearText>{`${year}年`}</YearText>
            </YearButton>
          </UpLeftView>
          <UpMiddleView>
            <MonthArrow
              onPress={this.monthSubtracte}
            >
              <MonthArrowIcon source={LeftArrow} />
            </MonthArrow>
            <MonthText>{month}</MonthText>
            <MonthArrow
              onPress={this.monthAdd}
            >
              <MonthArrowIcon source={RightArrow} />
            </MonthArrow>
          </UpMiddleView>
          <UpRightView>
            <TodayButton onPress={this.goToday}>
              <TodayButtonText>今</TodayButtonText>
            </TodayButton>
            <CreateButton onPress={selectCreateType}>
              <CreateButtonIcon />
            </CreateButton>
          </UpRightView>
        </UpView>
        <MiddleView />
        <DownView
          innerRef={(ref) => { this.flatListRef = ref; }}
          data={this.state.data}
          renderItem={this.renderItem(ListItemWidth)}
          keyExtractor={this.generateKeyExtractor}
          getItemLayout={this.getItemLayout}
          initialScrollIndex={this.getInitialScrollIndex(this.state.day)}
          onScrollEndDrag={this.onScrollEndDrag}
        />
      </Container>
    );
  }
}

Calendar.propTypes = {
  navigate: PropTypes.func.isRequired,
  selectCreateType: PropTypes.func.isRequired,
  onSelectedDayChange: PropTypes.func.isRequired,
};

export default Calendar;
