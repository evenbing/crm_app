import React, { Component } from 'react';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';

import IcoSchedule from '../../../img/home/ico_schedule.png';
import IcoUpcomingTasks from '../../../img/home/ico_upcomingtasks.png';
import IcoNotice from '../../../img/home/ico_notice.png';
import NavItem from '../../../components/NavItem';
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { routers } from '../../../constants';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const List = styled.FlatList`

`;

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    const { navigation: { navigate } } = props;
    this.data = [
      {
        key: uuidv1(),
        icon: IcoSchedule,
        title: '待办日程',
        number: '1',
        onPress: () => navigate(routers.upcomingScheduleList),
      },
      {
        key: uuidv1(),
        icon: IcoUpcomingTasks,
        title: '待办任务',
        number: '2',
        onPress: () => navigate(routers.upcomingTaskList),
      },
      {
        key: uuidv1(),
        icon: IcoNotice,
        title: '通知',
        number: '2',
        onPress: () => navigate(routers.notificationList),
      },
    ];
  }

  keyExtractor = item => item.key;

  renderItem = ({ item }) => {
    const {
      icon,
      title,
      number,
      onPress,
    } = item;
    return (
      <NavItem
        icon={icon}
        leftText={title}
        rightText={number}
        onPress={onPress}
      />
    );
  }

  render() {
    return (
      <Container>
        <CommStatusBar />
        <List
          data={this.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}

MessageList.navigationOptions = ({ navigation }) => ({
  title: '消息提醒',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
  ),
});

export default MessageList;
