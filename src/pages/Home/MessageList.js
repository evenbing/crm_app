import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';

import IcoSchedule from '../../img/home/ico_schedule.png';
import IcoUpcomingTasks from '../../img/home/ico_upcomingtasks.png';
import IcoNotice from '../../img/home/ico_notice.png';
import NavItem from '../../components/NavItem';
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { routers } from '../../constants';
import TaskScheduleStore from '../../logicStores/taskSchedule';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

useStrict(true);
@observer
class MessageList extends Component {
  componentDidMount() {
    TaskScheduleStore.getScheduleRelatedToMeReq({
      pageNumber: 1,
      pageSize: 1,
      type: 'SCHEDULE',
      category: 'UNREAD',
    });
    TaskScheduleStore.getTaskRelatedToMeReq({
      pageNumber: 1,
      pageSize: 1,
      type: 'TASK',
      category: 'UNREAD',
    });
    TaskScheduleStore.getMessageReq({
      pageNumber: 1,
      pageSize: 1,
      category: 'UNREAD',
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <CommStatusBar />
        <NavItem
          icon={IcoSchedule}
          leftText="待办日程"
          rightText={TaskScheduleStore.scheduleList.total}
          onPress={() => navigate(routers.upcomingScheduleList)}
        />
        <NavItem
          icon={IcoUpcomingTasks}
          leftText="待办任务"
          rightText={TaskScheduleStore.taskList.total}
          onPress={() => navigate(routers.upcomingTaskList)}
        />
        <NavItem
          icon={IcoNotice}
          leftText="通知"
          rightText={TaskScheduleStore.messageList.total}
          onPress={() => navigate(routers.notificationList)}
        />
      </Container>
    );
  }
}

MessageList.navigationOptions = () => ({
  title: '消息提醒',
  headerLeft: (
    <LeftBackIcon />
  ),
});

MessageList.defaultProps = {};

MessageList.propTypes = {
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

export default MessageList;
