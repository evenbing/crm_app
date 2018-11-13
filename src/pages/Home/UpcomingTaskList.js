import React, { Component } from 'react';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';

import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import ListItem from './components/ListItem';
import { get2Date } from '../../utils/date';
import TaskScheduleStore from '../../logicStores/taskSchedule';
import FlatListTable from '../../components/FlatListTable';
import { ContainerView } from '../../components/Styles/Layout';


useStrict(true);

@observer
class UpcomingTaskList extends Component {
  componentDidMount() {
    this.getData();
  }

  onEndReached = () => {
    const {
      total,
      list,
      pageNumber,
      loadingMore,
    } = TaskScheduleStore.taskScheduleList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };

  getData = (pageNumber = 1) => {
    TaskScheduleStore.getTaskScheduleRelatedToMeReq({
      pageNumber,
      type: 'TASK',
      category: 'UNREAD',
    });
  };

  keyExtractor = item => item.id;

  render() {
    const {
      taskScheduleList: { list, refreshing, loadingMore },
    } = TaskScheduleStore;
    const data = list.map((item) => {
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
        id,
        type: typeText,
        duration,
        name,
        comment,
      });
    });
    return (
      <ContainerView bottomPadding>
        <CommStatusBar />
        <FlatListTable
          data={data}
          keyExtractor={this.keyExtractor}
          renderItemElem={<ListItem />}
          onRefresh={this.getData}
          onEndReached={this.onEndReached}
          refreshing={refreshing}
          noDataBool={!refreshing && list.length === 0}
          loadingMore={loadingMore}
        />
      </ContainerView>
    );
  }
}

UpcomingTaskList.navigationOptions = () => ({
  title: '待办任务',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default UpcomingTaskList;
