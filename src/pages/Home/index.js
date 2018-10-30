/**
 * @component Home.js
 * @description 首页
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import React from 'react';
import { Alert } from 'react-native';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';

import TaskScheduleStore from '../../logicStores/taskSchedule';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { ActionSheet } from '../../components/Modal';
import { routers } from '../../constants';
import Calendar from './components/Calendar';
import TodayView from './components/TodayView';
import { get2Date } from '../../utils/date';
import TaskScheduleList from './components/TaskScheduleList';
import { ContainerView } from '../../components/Styles/Layout';
import { formatDateByMoment } from '../../utils/base';
import Toast from '../../utils/toast';

const createTypes = [
  { leftText: '新建日程' },
  { leftText: '新建任务' },
];

const delayTypes = [
  { leftText: '1小时以后' },
  { leftText: '3小时以后' },
  { leftText: '明天' },
  { leftText: '后天' },
  // { leftText: '自定义' },
];

@observer
class Home extends React.Component {
  state = {
    createActionSheetVisible: false,
    delayActionSheetVisible: false,
  };

  componentDidMount() {
    const curYear = new Date().getFullYear();
    const curMonth = get2Date(new Date().getMonth() + 1);
    const curDay = get2Date(new Date().getDate());
    this.curSelectedDate = `${curYear}${curMonth}${curDay}`;
    this.getTaskScheduleList(`${curYear}${curMonth}${curDay}`);
  }

  onSelectCreateType = ({ item }) => {
    const { navigate } = this.props.navigation;
    switch (item.leftText) {
      case '新建日程':
        this.setState({ createActionSheetVisible: false }, () => {
          navigate(routers.addSchedule, {
            reFetchTaskScheduleList: this.reFetchTaskScheduleList,
          });
        });
        break;
      case '新建任务':
        this.setState({ createActionSheetVisible: false }, () => {
          navigate(routers.addTask, {
            reFetchTaskScheduleList: this.reFetchTaskScheduleList,
          });
        });
        break;
      default:
        break;
    }
  }

  onSelectDelayType = ({ item }) => {
    switch (item.leftText) {
      case '1小时以后':
        this.updateTaskAndSchedule({
          time: 60 * 1000,
        });
        this.setState({ delayActionSheetVisible: false });
        break;
      case '3小时以后':
        this.updateTaskAndSchedule({
          time: 3 * 60 * 1000,
        });
        this.setState({ delayActionSheetVisible: false });
        break;
      case '明天':
        this.updateTaskAndSchedule({
          time: 24 * 60 * 1000,
        });
        this.setState({ delayActionSheetVisible: false });
        break;
      case '后天':
        this.updateTaskAndSchedule({
          time: 2 * 24 * 60 * 1000,
        });
        this.setState({ delayActionSheetVisible: false });
        break;
      case '自定义':
        this.setState({ delayActionSheetVisible: false });
        break;
      default:
        break;
    }
  }

  onSelectedDayChange = (date) => {
    this.curSelectedDate = date;
    this.getTaskScheduleList(date);
  }

  onPressItem = ({ id, type, startTime, endTime, moduleId, moduleType, rowVersion }) => {
    this.selectedItemId = id;
    this.selectedItemType = type;
    this.selectedStartTime = startTime;
    this.selectedEndTime = endTime;
    this.selectedMoudleId = moduleId;
    this.selectedMoudleType = moduleType;
    this.selectedRowVersion = rowVersion;
  }

  getTaskScheduleList = (date) => {
    const endDate = date.replace('00:00:00', '23:59:59');
    TaskScheduleStore.getTaskScheduleRelatedToMeReq(1, {
      pageSize: 100,
      startDateId: date,
      endDateId: endDate,
    });
  }

  updateTaskAndSchedule = ({ time }) => {
    if (this.selectedStartTime && Number(this.selectedStartTime) < Number(Math.round(new Date()))) {
      Toast.showWarning('该任务已经开始');
      return;
    }
    TaskScheduleStore.updateTaskScheduleRelatedToMeReq({
      id: this.selectedItemId,
      type: this.selectedItemType,
      startTime: this.selectedStartTime ? formatDateByMoment(this.selectedStartTime, 'YYYY-MM-DD HH:mm:ss') : null,
      endTime: formatDateByMoment(Number(this.selectedEndTime) + time, 'YYYY-MM-DD HH:mm:ss'),
      moduleId: this.selectedMoudleId,
      moduleType: this.selectedMoudleType,
      rowVersion: this.selectedRowVersion,
    });
  }

  reFetchTaskScheduleList = () => {
    this.getTaskScheduleList(this.curSelectedDate);
    // TaskScheduleStore.getTaskScheduleRelatedToMeReq({
    //   startDateId: this.curSelectedDate,
    //   endDateId: this.curSelectedDate,
    // });
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
      moduleType,
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

  render() {
    const {
      state: {
        createActionSheetVisible,
        delayActionSheetVisible,
      },
      props: {
        navigation: {
          navigate,
        },
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
    const data = TaskScheduleStore.taskScheduleList.list.map(item => this.formatTaskScheduleListData(item));
    return (
      <ContainerView bottomPadding >
        <CommStatusBar />
        <ActionSheet {...createActionSheetProps} />
        <ActionSheet {...delayActionSheetProps} />
        <TodayView showMessageList={this.showMessageList} />
        <Calendar
          navigate={navigate}
          selectCreateType={this.selectCreateType}
          onSelectedDayChange={this.onSelectedDayChange}
        />
        <TaskScheduleList data={data} />
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
