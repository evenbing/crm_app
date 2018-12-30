/**
 * @component UpcomingScheduleList.js
 * @description 未完成日程列表
 * @time 2018/8/5
 * @add Justin Xu
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon } from 'xn-react-native-applets';

// constants
import { routers, CreateActionSheetType, DelayActionSheetType } from 'constants';

// utils
import { formatDateByMoment, formatDateTaskScheduleType } from 'utils/base';

// components
import FlatListTable from 'components/FlatListTable';
import { ContainerView } from 'components/Styles/Layout';
import ActionSheet from 'components/Modal/ActionSheet';
import ListItem from './components/ListItem';

import TaskScheduleStore from '../../logicStores/taskSchedule';

useStrict(true);

@observer
class UpcomingScheduleList extends React.Component {
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

  onPressDetails = ({ path, item }) => {
    if (!path) return;
    const {
      navigation: { navigate },
    } = this.props;
    navigate(path, { item });
  };

  getData = (pageNumber = 1) => {
    const {
      props: {
        navigation: { state },
      },
    } = this;
    const params = state.params || {};
    TaskScheduleStore.getScheduleRelatedToMeReq({ pageNumber, ...params });
  };

  selectDelayType = () => {
    this.setState({
      delayActionSheetVisible: true,
    });
  };

  nextSelectCreateType = id => () => {
    this.oldTaskScheduleId = id;
    this.setState({
      createActionSheetVisible: true,
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
      startTime,
      endTime,
    } = item;
    return (
      <ListItem
        index={index}
        item={{
          ...item,
          type: '日程',
          startDuration: `${formatDateByMoment(startTime, formatDateTaskScheduleType)}`,
          endDuration: `${formatDateByMoment(endTime, formatDateTaskScheduleType)}`,
          operateList: [
            { key: `${id}1`, text: '下一步', onPress: this.nextSelectCreateType(id) },
            { key: `${id}2`, text: '延时', onPress: this.selectDelayType },
            { key: `${id}3`, text: '删除', onPress: this.deleteTaskSchedule },
          ],
        }}
        onPressItem={this.onPressItem}
        onPressDetails={() => this.onPressDetails({ path: routers.scheduleDetails, item })}
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
    const {
      scheduleList: {
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
    return (
      <ContainerView bottomPadding>
        <CommStatusBar />
        <ActionSheet {...createActionSheetProps} />
        <ActionSheet {...delayActionSheetProps} />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

UpcomingScheduleList.navigationOptions = ({ navigation }) => ({
  title: '待办日程',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

UpcomingScheduleList.defaultProps = {};

UpcomingScheduleList.propTypes = {
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


export default UpcomingScheduleList;
