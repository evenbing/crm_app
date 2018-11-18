/**
 * @component Home.js
 * @description 首页
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Alert, View } from 'react-native';
import { observer } from 'mobx-react/native';

// constants
import { routers, CreateActionSheetType, DelayActionSheetType } from '../../constants';

// utils
import { get2Date } from '../../utils/date';
import { nativeGoBack } from '../../utils/base';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { ActionSheet } from '../../components/Modal';
import { ContainerView, ListFooterComponent } from '../../components/Styles/Layout';
import FlatListTable from '../../components/FlatListTable';
import Calendar from './components/Calendar';
import TodayView from './components/TodayView';
import TaskScheduleListItem from './components/ListItem';

import TaskScheduleStore from '../../logicStores/taskSchedule';

@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createActionSheetVisible: false,
      delayActionSheetVisible: false,
    };

    this.oldTaskScheduleId = null;
  }

  componentDidMount() {
    this.getData();
    // 获取未完成
    TaskScheduleStore.getUnFinishTotalReq();
  }

  onSelectCreateType = ({ item }) => {
    const param = {};
    if (this.oldTaskScheduleId) {
      param.oldTaskScheduleId = this.oldTaskScheduleId;
    }
    const { navigate } = this.props.navigation;
    if (!Object.keys(item).length) return;
    navigate(item.path, param);
  };

  onSelectDelayType = ({ item }) => {
    if (!Object.keys(item).length) return;
    TaskScheduleStore.updateTaskHoursReq({
      id: this.selectedItemId,
      delayHours: item.delayHours,
    });
  };

  onSelectedDayChange = (date) => {
    this.curSelectedDate = date;
    this.getData();
  };

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

  onPressFinish = (id) => {
    TaskScheduleStore.updateTaskCompleteReq({
      id,
    });
  };

  // 获取任务/日程
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
      isCompleted,
    } = item;
    let typeText = '';
    let duration = '';
    let firstButtonText = '';
    let firstButtonPress = null;
    const startDate = new Date(parseInt(startTime, 10));
    const endDate = new Date(parseInt(endTime, 10));
    switch (type) {
      case 'TASK':
        typeText = '任务';
        firstButtonText = '完成';
        firstButtonPress = this.onPressFinish;
        duration = `${get2Date(endDate.getHours())}:${get2Date(endDate.getMinutes())}`;
        break;
      case 'SCHEDULE':
        typeText = ' 日程';
        firstButtonText = '下一步';
        firstButtonPress = this.nextSelectCreateType(id);
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
      isCompleted,
      operateList: [
        { key: `${id}1`, text: firstButtonText, onPress: firstButtonPress },
        { key: `${id}2`, text: '延时', onPress: this.selectDelayType },
        { key: `${id}3`, text: '删除', onPress: this.deleteTaskSchedule },
      ],
      onPressItem: this.onPressItem,
    });
  };

  selectCreateType = () => {
    this.oldTaskScheduleId = null;
    this.setState({
      createActionSheetVisible: true,
    });
  };

  nextSelectCreateType = id => () => {
    this.oldTaskScheduleId = id;
    this.setState({
      createActionSheetVisible: true,
    });
  };

  selectDelayType = () => {
    this.setState({
      delayActionSheetVisible: true,
    });
  };

  deleteTaskSchedule = id => () => {
    console.log(id);
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
            TaskScheduleStore.deleteTaskScheduleRelatedToMeReq({ id });
          },
        },
      ],
      { cancelable: false },
    );
  };

  renderHeader = () => {
    const {
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    const {
      getUnFinishTotal,
    } = TaskScheduleStore;
    return (
      <View>
        <TodayView
          key="todayView"
          showMessageList={this.showMessageList}
          showPoint={getUnFinishTotal > 0}
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
      list: CreateActionSheetType,
    };
    const delayActionSheetProps = {
      isVisible: delayActionSheetVisible,
      onPressClose: () => { this.setState({ delayActionSheetVisible: false }); },
      onPressItem: this.onSelectDelayType,
      list: DelayActionSheetType,
    };
    const {
      taskScheduleList: { refreshing, list, total, loadingMore },
    } = TaskScheduleStore;
    const data = TaskScheduleStore.taskScheduleList.list.map(item => this.formatTaskScheduleListData(item));
    const flatProps = {
      data,
      headerHeight: 217,
      renderHeader: this.renderHeader(),
      renderItemElem: <TaskScheduleListItem />,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      ListFooterComponent: (Number(total) === list.length && !!total) ? <ListFooterComponent /> : null,
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
    <LeftBackIcon onPress={nativeGoBack} />
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
