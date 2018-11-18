/**
 * @component UpcomingTaskList.js
 * @description 未完成任务列表
 * @time 2018/8/5
 * @add Justin Xu
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';

// constants
import { routers, DelayActionSheetType } from '../../constants';

// utils
import { formatDateByMoment, formatDateTaskScheduleType } from '../../utils/base';

import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import FlatListTable from '../../components/FlatListTable';
import { ContainerView } from '../../components/Styles/Layout';
import ActionSheet from '../../components/Modal/ActionSheet';
import ListItem from './components/ListItem';

import TaskScheduleStore from '../../logicStores/taskSchedule';

useStrict(true);

@observer
class UpcomingTaskList extends React.Component {
  state = {
    delayActionSheetVisible: false,
  };
  componentDidMount() {
    this.getData();
  }

  onPressFinish = (id) => {
    TaskScheduleStore.updateTaskCompleteReq({
      id,
    });
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

  onPressDetails = ({ path, item }) => {
    if (!path) return;
    const {
      navigation: { navigate },
    } = this.props;
    navigate(path, { item });
  };

  getData = (pageNumber = 1) => {
    TaskScheduleStore.getTaskRelatedToMeReq({ pageNumber });
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

  renderItem = ({ item, index }) => {
    const {
      id,
      endTime,
    } = item;
    return (
      <ListItem
        index={index}
        item={{
          ...item,
          type: '任务',
          duration: formatDateByMoment(endTime, formatDateTaskScheduleType),
          operateList: [
            { key: `${id}1`, text: '完成', onPress: this.onPressFinish },
            { key: `${id}2`, text: '延时', onPress: this.selectDelayType },
            { key: `${id}3`, text: '删除', onPress: this.deleteTaskSchedule },
          ],
        }}
        onPressItem={this.onPressItem}
        onPressDetails={() => this.onPressDetails({ path: routers.taskDetails, item })}
      />
    );
  };

  render() {
    const {
      state: {
        delayActionSheetVisible,
      },
    } = this;
    const {
      taskList: {
        refreshing,
        list,
      },
    } = TaskScheduleStore;
    const flatProps = {
      data: list,
      keyExtractor: item => item.id,
      renderItem: this.renderItem,
      onRefresh: this.getData,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
    };
    const delayActionSheetProps = {
      isVisible: delayActionSheetVisible,
      onPressClose: () => { this.setState({ delayActionSheetVisible: false }); },
      onPressItem: this.onSelectDelayType,
      list: DelayActionSheetType,
    };
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <ActionSheet {...delayActionSheetProps} />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

UpcomingTaskList.navigationOptions = ({ navigation }) => ({
  title: '待办任务',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

UpcomingTaskList.defaultProps = {};

UpcomingTaskList.propTypes = {
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


export default UpcomingTaskList;
