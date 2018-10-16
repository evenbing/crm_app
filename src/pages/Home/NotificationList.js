import React, { Component } from 'react';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';

import { LeftBackIcon, CommStatusBar } from '../../components/Layout';
import { moderateScale } from '../../utils/scale';
import TaskScheduleStore from '../../logicStores/taskSchedule';
import { formatDateByMoment } from '../../utils/base';

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

useStrict(true);

@observer
class NotificationList extends Component {
  componentDidMount() {
    this.getData(1);
  }

  onEndReached = () => {
    const {
      total,
      list,
      pageNumber,
      loadingMore,
    } = TaskScheduleStore.messageList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };

  getData = (pageNumber = 1) => {
    TaskScheduleStore.getMessageReq(pageNumber, {
      category: 'UNREAD',
    });
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => {
    const {
      messageTime,
      messageContent,
    } = item;
    return (
      <ListItem>
        <Time>{formatDateByMoment(messageTime)}</Time>
        <Divder />
        <Content>{messageContent}</Content>
      </ListItem>
    );
  }

  render() {
    const { list, refreshing, loadingMore } = TaskScheduleStore.messageList;
    return (
      <ContainerView>
        <CommStatusBar />
        <List
          data={list}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
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

NotificationList.navigationOptions = () => ({
  title: '通知',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default NotificationList;
