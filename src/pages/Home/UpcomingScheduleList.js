import React, { Component } from 'react';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import styled from 'styled-components';

import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import ListItem from './components/ListItem';
import { get2Date } from '../../utils/date';
import TaskScheduleStore from '../../logicStores/taskSchedule';
import FlatListTable from '../../components/FlatListTable';
import { ContainerView } from '../../components/Styles/Layout';
import { theme } from '../../constants';
import { moderateScale } from '../../utils/scale';


const ListItemSeparatorComponent = styled.View`
  background-color: transparent;
  height: ${moderateScale(10)}px;
`;
useStrict(true);

@observer
class UpcomingScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

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
      type: 'SCHEDULE',
      category: 'UNREAD',
    });
  };

  keyExtractor = item => item.id;

  renderItem = ({ item }) => {
    const {
      id,
      duration,
      type,
      name,
      comment,
      // operateList,
    } = item;
    return (<ListItem
      id={id}
      duration={duration}
      type={type}
      name={name}
      comment={comment}
      operateList={[]}
    />);
  }

  renderItemSeparatorComponent = () => <ListItemSeparatorComponent />

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
          tableBodyStyle={{ paddingTop: theme.moderateScale(10), paddingLeft: theme.moderateScale(15), paddingRight: theme.moderateScale(15) }}
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onRefresh={this.getData}
          onEndReached={this.onEndReached}
          refreshing={refreshing}
          noDataBool={!refreshing && list.length === 0}
          loadingMore={loadingMore}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
        />
      </ContainerView>
    );
  }
}

UpcomingScheduleList.navigationOptions = () => ({
  title: '待办日程',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default UpcomingScheduleList;
