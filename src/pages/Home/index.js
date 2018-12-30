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
import { CommStatusBar, TopRightView } from 'xn-react-native-applets';

// constants
import { routers, CreateActionSheetType, DelayActionSheetType } from 'constants';

// utils
import { get2Date } from 'utils/date';
import { formatDateByMoment } from 'utils/base';

// logicStores
import TaskScheduleStore from 'logicStores/taskSchedule';

// components
import { ActionSheet } from 'components/Modal';
import { ContainerView, ListFooterComponent } from 'components/Styles/Layout';
import FlatListTable from 'components/FlatListTable';
import Calendar from './components/Calendar';
import TodayView from './components/TodayView';
import TaskScheduleListItem from './components/ListItem';

const formatDateTaskScheduleType = 'HH:mm';

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

  onPressItem = (item) => {
    this.selectedCacheItem = { ...item };
  };

  onSelectDelayType = ({ item }) => {
    if (!Object.keys(item).length) return;
    TaskScheduleStore.updateTaskHoursReq({
      id: this.selectedCacheItem.id,
      delayHours: item.delayHours,
    });
  };

  onSelectedDayChange = (date) => {
    this.curSelectedDate = date;
    this.getData();
  };

  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = TaskScheduleStore.taskScheduleList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };

  onPressFinish = (id) => {
    TaskScheduleStore.updateTaskCompleteReq({ id });
  };

  onPressMessageList = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate(routers.messageList);
  };

  onPressDetails = ({ path, item }) => {
    if (!path) return;
    const {
      navigation: { navigate },
    } = this.props;
    navigate(path, { item });
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
      currentDateId: currDate,
    });
  };

  // 获取item props
  getTaskScheduleProps = (item) => {
    const {
      id,
      startTime,
      endTime,
      type,
    } = item;
    if (type === 'TASK') {
      return {
        path: routers.taskDetails,
        typeText: '任务',
        firstButtonText: '完成',
        firstButtonPress: this.onPressFinish,
        duration: formatDateByMoment(endTime, formatDateTaskScheduleType),
      };
    }
    if (type === 'SCHEDULE') {
      return {
        path: routers.scheduleDetails,
        typeText: '日程',
        firstButtonText: '下一步',
        firstButtonPress: this.nextSelectCreateType(id),
        duration: `${formatDateByMoment(startTime, formatDateTaskScheduleType)}-${formatDateByMoment(endTime, formatDateTaskScheduleType)}`,
      };
    }
    return {};
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
          showMessageList={this.onPressMessageList}
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

  renderItem = ({ item, index }) => {
    const {
      id,
    } = item;
    const {
      path,
      typeText,
      duration,
      firstButtonText,
      firstButtonPress,
    } = this.getTaskScheduleProps(item);
    return (
      <TaskScheduleListItem
        index={index}
        item={{
          ...item,
          type: typeText,
          duration,
          operateList: [
            { key: `${id}1`, text: firstButtonText, onPress: firstButtonPress },
            { key: `${id}2`, text: '延时', onPress: this.selectDelayType },
            { key: `${id}3`, text: '删除', onPress: this.deleteTaskSchedule },
          ],
        }}
        onPressItem={this.onPressItem}
        onPressDetails={() => this.onPressDetails({ path, item })}
      />
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
      taskScheduleList: {
        refreshing,
        list,
        total,
        loadingMore,
      },
    } = TaskScheduleStore;
    const flatProps = {
      data: list,
      headerHeight: 217,
      renderHeader: this.renderHeader(),
      renderItem: this.renderItem,
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

Home.navigationOptions = ({ navigation }) => ({
  title: '首页',
  headerRight: (
    <TopRightView
      appName="CRM"
      onPress={() => navigation.navigate(routers.about, {
        // code: 'CRM',
      })}
    />
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
