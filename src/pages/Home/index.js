/**
 * @component Home.js
 * @description 首页
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Alert, View } from 'react-native';
import { observer } from 'mobx-react/native';

import { routers } from '../../constants';
import { moderateScale } from '../../utils/scale';
import { get2Date } from '../../utils/date';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { ActionSheet } from '../../components/Modal';
import { ContainerView } from '../../components/Styles/Layout';
import FlatListTable from '../../components/FlatListTable';
import Calendar from './components/Calendar';
import TodayView from './components/TodayView';
// import TaskScheduleList from './components/TaskScheduleList';
import TaskScheduleListItem from './components/ListItem';

import TaskScheduleStore from '../../logicStores/taskSchedule';

const ListItemSeparatorComponent = styled.View`
  background-color: transparent;
  height: ${moderateScale(10)}px;
`;

const ListFooterComponent = styled.View`
  background-color: transparent;
  height: ${moderateScale(60)}px;
`;

const createTypes = [
  { leftText: '新建日程', path: routers.addSchedule },
  { leftText: '新建任务', path: routers.addTask },
];

const delayTypes = [
  { leftText: '1小时以后', delayHours: 1 },
  { leftText: '3小时以后', delayHours: 3 },
  { leftText: '明天', delayHours: 24 },
  { leftText: '后天', delayHours: 48 },
];

@observer
class Home extends React.Component {
  state = {
    createActionSheetVisible: false,
    delayActionSheetVisible: false,
  };

  componentDidMount() {
    this.getData();
  }

  onSelectCreateType = ({ item }) => {
    const { navigate } = this.props.navigation;
    if (!Object.keys(item).length) return;
    navigate(item.path);
  }

  onSelectDelayType = ({ item }) => {
    if (!Object.keys(item).length) return;
    TaskScheduleStore.updateTaskHoursReq({
      id: this.selectedItemId,
      delayHours: item.delayHours,
    });
  }

  onSelectedDayChange = (date) => {
    this.curSelectedDate = date;
    this.getData();
  }

  onPressItem = ({ id, type, startTime, endTime, moduleId, moduleType, rowVersion }) => {
    this.selectedItemId = id;
    this.selectedItemType = type;
    this.selectedStartTime = startTime;
    this.selectedEndTime = endTime;
    this.selectedMoudleId = moduleId;
    this.selectedMoudleType = moduleType;
    this.selectedRowVersion = rowVersion;
  };

  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = TaskScheduleStore.taskScheduleList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };

  getData = (pageNumber = 1) => {
    let currDate = this.curSelectedDate;
    if (!currDate) {
      const curYear = new Date().getFullYear();
      const curMonth = get2Date(new Date().getMonth() + 1);
      const curDay = get2Date(new Date().getDate());
      currDate = `${curYear}${curMonth}${curDay}`;
      this.curSelectedDate = currDate;
    }
    TaskScheduleStore.getTaskScheduleRelatedToMeReq({
      pageNumber,
      startDateId: currDate,
      endDateId: currDate,
    });
  };

  reFetchTaskScheduleList = () => {
    this.getData();
  }

  showMessageList = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate(routers.messageList);
  }

  formatTaskScheduleListData = (item) => {
    const {
      id,
      startTime,
      endTime,
      moduleId = '',
      moduleType = '',
      type,
      name,
      comment,
      rowVersion,
    } = item;
    let typeText = '';
    let duration = '';
    const startDate = new Date(parseInt(startTime, 10));
    const endDate = new Date(parseInt(endTime, 10));
    switch (type) {
      case 'TASK':
        typeText = '任务';
        duration = `${get2Date(endDate.getHours())}:${get2Date(endDate.getMinutes())}`;
        break;
      case 'SCHEDULE':
        typeText = ' 日程';
        duration = `${get2Date(startDate.getHours())}:${get2Date(startDate.getMinutes())}-${get2Date(endDate.getHours())}:${get2Date(endDate.getMinutes())}`;
        break;
      default:
        break;
    }
    return ({
      id,
      duration,
      type: typeText,
      name,
      comment,
      startTime,
      endTime,
      moduleId,
      moduleType,
      rowVersion,
      reFetchTaskScheduleList: this.reFetchTaskScheduleList,
      operateList: [
        { key: `${id}1`, text: '下一步', onPress: this.selectCreateType },
        { key: `${id}2`, text: '延时', onPress: this.selectDelayType },
        { key: `${id}3`, text: '删除', onPress: this.deleteTaskSchedule },
      ],
      onPressItem: this.onPressItem,
    });
  }

  selectCreateType = () => {
    this.setState({
      createActionSheetVisible: true,
    });
  }

  selectDelayType = () => {
    this.setState({
      delayActionSheetVisible: true,
    });
  }

  deleteTaskSchedule = id => () => {
    Alert.alert(
      '提示',
      '确定删除吗？',
      [
        {
          text: '取消',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: '确定',
          onPress: () => {
            TaskScheduleStore.deleteTaskScheduleRelatedToMeReq({
              id,
            }, this.reFetchTaskScheduleList);
          },
        },
      ],
      { cancelable: false },
    );
  }

  renderHeader = () => {
    const {
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    return (
      <View>
        <TodayView
          key="todayView"
          showMessageList={this.showMessageList}
        />
        <Calendar
          key="calendar"
          navigate={navigate}
          selectCreateType={this.selectCreateType}
          onSelectedDayChange={this.onSelectedDayChange}
        />
      </View>
    );
  };

  render() {
    const {
      state: {
        createActionSheetVisible,
        delayActionSheetVisible,
      },
    } = this;
    const createActionSheetProps = {
      isVisible: createActionSheetVisible,
      onPressClose: () => { this.setState({ createActionSheetVisible: false }); },
      onPressItem: this.onSelectCreateType,
      list: createTypes,
    };
    const delayActionSheetProps = {
      isVisible: delayActionSheetVisible,
      onPressClose: () => { this.setState({ delayActionSheetVisible: false }); },
      onPressItem: this.onSelectDelayType,
      list: delayTypes,
    };
    const {
      taskScheduleList: { refreshing, list, total, loadingMore },
    } = TaskScheduleStore;
    const data = TaskScheduleStore.taskScheduleList.list.map(item => this.formatTaskScheduleListData(item));
    const flatProps = {
      flatListStyle: {
        paddingTop: moderateScale(10),
        paddingRight: moderateScale(15),
        paddingLeft: moderateScale(15),
      },
      data,
      headerHeight: 217,
      renderHeader: this.renderHeader(),
      renderItemElem: <TaskScheduleListItem />,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      ItemSeparatorComponent: () => <ListItemSeparatorComponent />,
      ListFooterComponent: (total === list.length && total) ? <ListFooterComponent /> : null,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
    };
    return (
      <ContainerView>
        <CommStatusBar />
        <ActionSheet {...createActionSheetProps} />
        <ActionSheet {...delayActionSheetProps} />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

Home.navigationOptions = () => ({
  title: '首页',
  headerLeft: (
    <LeftBackIcon />
  ),
});

Home.defaultProps = {};

Home.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default Home;
