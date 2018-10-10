import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import styled from 'styled-components';

import { LeftBackIcon, CommStatusBar } from '../../components/Layout';
import { moderateScale } from '../../utils/scale';
import TaskScheduleStore from '../../logicStores/taskSchedule';

const ContainerView = styled.View`
  flex: 1;
`;

const List = styled.FlatList`
  background-color: #F6F6F6;
  padding: 0px ${moderateScale(15)}px 0px ${moderateScale(15)}px;
`;

const ListItem = styled.View`
  margin-top: ${moderateScale(10)}px;
  padding: ${moderateScale(5)}px ${moderateScale(15)}px;
  border-radius: ${moderateScale(5)}px;
  background-color: white;
`;

const Time = styled.Text`
  color: grey;
  font-size: ${moderateScale(14)}px;
`;

const Divder = styled.View`
  height: ${moderateScale(1)}px;
  background-color: #F6F6F6;
  margin: ${moderateScale(4)}px 0px;
`;

const Content = styled.Text`
  color: black;
  font-size: ${moderateScale(14)}px;
  line-height: 20;
`;

const data = [
  {
    key: uuidv1(),
    time: '2019-09-09 09:09',
    content: 'React Navigation 源于 React Native 社区对一个可扩展且易于使用的导航解决方案的需求，它完全使用 JavaScript 编写（因此你可以阅读并理解所有源码）。',
  },
  {
    key: uuidv1(),
    time: '2019-09-09 09:09',
    content: 'React Navigation 源于 React Native 社区对一个可扩展且易于使用的导航解决方案的需求，它完全使用 JavaScript 编写（因此你可以阅读并理解所有源码）。',
  },
  {
    key: uuidv1(),
    time: '2019-09-09 09:09',
    content: 'React Navigation 源于 React Native 社区对一个可扩展且易于使用的导航解决方案的需求，它完全使用 JavaScript 编写（因此你可以阅读并理解所有源码）。',
  },
];

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    TaskScheduleStore.getMessageReq();
  }

  keyExtractor = item => item.key;

  renderItem = ({ item }) => {
    const {
      time,
      content,
    } = item;
    return (
      <ListItem>
        <Time>{time}</Time>
        <Divder />
        <Content>{content}</Content>
      </ListItem>

    );
  }

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <List
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </ContainerView>
    );
  }
}

NotificationList.navigationOptions = () => ({
  title: '通知',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default NotificationList;
