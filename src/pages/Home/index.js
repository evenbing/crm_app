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
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';

import Toast from '../../utils/toast';
import ListItem from './components/ListItem';
import TaskScheduleStore from '../../logicStores/taskSchedule';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { ActionSheet } from '../../components/Modal';
import { moderateScale } from '../../utils/scale';
import { routers } from '../../constants';
import Calendar from './components/Calendar';
import TodayView from './components/TodayView';
import { get2Date } from '../../utils/date';
import TaskScheduleList from './components/TaskScheduleList';
import { ContainerView } from '../../components/Styles/Layout';

const createTypes = [
  { leftText: '新建日程' },
  { leftText: '新建任务' },
];

const delayTypes = [
  { leftText: '1小时以后' },
  { leftText: '3小时以后' },
  { leftText: '明天' },
  { leftText: '后天' },
  { leftText: '自定义' },
];

const ListItemSeparatorComponent = styled.View`
  background-color: transparent;
  height: ${moderateScale(10)}px;
`;

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
        navigate(routers.addSchedule);
        this.setState({ createActionSheetVisible: false });
        break;
      case '新建任务':
        navigate(routers.addTask);
        this.setState({ createActionSheetVisible: false });
        break;
      default:
        break;
    }
  }

  onSelectDelayType = ({ item }) => {
    const { navigate } = this.props.navigation;
    switch (item.leftText) {
      case '1小时之后':
        // navigate(routers.addSchedule);
        this.setState({ delayActionSheetVisible: false });
        break;
      case '3小时之后':
        // navigate(routers.addTask);
        this.setState({ delayActionSheetVisible: false });
        break;
      case '明天':
        // navigate(routers.addTask);
        this.setState({ delayActionSheetVisible: false });
        break;
      case '后天':
        // navigate(routers.addTask);
        this.setState({ delayActionSheetVisible: false });
        break;
      case '自定义':
        // navigate(routers.addTask);
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

  getTaskScheduleList = (date) => {
    TaskScheduleStore.getTaskScheduleRelatedToMeReq({
      startDateId: date,
      endDateId: date,
    });
  }

  reFetchTaskScheduleList = () => {
    TaskScheduleStore.getTaskScheduleRelatedToMeReq({
      startDateId: this.curSelectedDate,
      endDateId: this.curSelectedDate,
    });
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
      type,
      name,
      comment,
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
      key: id,
      duration,
      type: typeText,
      name,
      comment,
      reFetchTaskScheduleList: this.reFetchTaskScheduleList,
      operateList: [
        { key: uuidv1(), text: '下一步', onPress: this.selectCreateType },
        { key: uuidv1(), text: '延时', onPress: this.selectDelayType },
        { key: uuidv1(), text: '删除', onPress: this.deleteTaskSchedule },
      ],
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

  renderItem = ({ item }) => {
    const {
      startTime,
      endTime,
      type,
      name,
      comment,
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
    return (<ListItem
      duration={duration}
      type={typeText}
      name={name}
      comment={comment}
      operateList={[
        { key: uuidv1(), text: '下一步', onPress: this.selectCreateType },
        { key: uuidv1(), text: '延时', onPress: this.selectDelayType },
        { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
      ]}
    />);
  }

  renderItemSeparatorComponent = () => <ListItemSeparatorComponent />

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
      onPressClose: this.selectCreateType,
      onPressItem: this.onSelectCreateType,
      list: createTypes,
    };
    const delayActionSheetProps = {
      isVisible: delayActionSheetVisible,
      onPressClose: this.selectDelayType,
      onPressItem: this.onSelectDelayType,
      list: delayTypes,
    };
    const data = TaskScheduleStore.taskScheduleList.map(item => this.formatTaskScheduleListData(item));
    return (
      <ContainerView>
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
