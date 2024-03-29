import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon } from 'xn-react-native-applets';

// constants
import { routers } from 'constants';

// static source
import IcoSchedule from 'img/home/ico_schedule.png';
import IcoUpcomingTasks from 'img/home/ico_upcomingtasks.png';

// components
import NavItem from 'components/NavItem';

// logicStores
import TaskScheduleStore from 'logicStores/taskSchedule';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

useStrict(true);

const RightTextStyle = {
  color: '#E03C3C',
};

@observer
class MessageList extends Component {
  componentDidMount() {
    TaskScheduleStore.getUnFinishTotalReq();
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
          rightTextStyle={RightTextStyle}
          onPress={() => navigate(routers.upcomingScheduleList)}
        />
        <NavItem
          icon={IcoUpcomingTasks}
          leftText="待办任务"
          rightText={TaskScheduleStore.taskList.total}
          rightTextStyle={RightTextStyle}
          onPress={() => navigate(routers.upcomingTaskList)}
        />
      </Container>
    );
  }
}

MessageList.navigationOptions = ({ navigation }) => ({
  title: '消息提醒',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
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
