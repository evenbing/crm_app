import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import styled from 'styled-components';

import Toast from '../../utils/toast';
import { moderateScale } from '../../utils/scale';
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import ListItem from './components/ListItem';

const data = [
  {
    key: '1',
    duration: '20:00-22:00',
    type: '日程',
    title: '拜访李总',
    time: '2小时',
    operateList: [
      { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
      { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
      { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
    ],
  },
  {
    key: '2',
    duration: '20:00-22:00',
    type: '任务',
    title: '讲解产品信息',
    time: '2小时',
    operateList: [
      { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
      { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
      { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
    ],
  },
  {
    key: '3',
    duration: '20:00-22:00',
    type: '日程',
    title: '拜访李总',
    time: '2小时',
    operateList: [
      { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
      { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
      { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
    ],
  },
  {
    key: '4',
    duration: '20:00-22:00',
    type: '日程',
    title: '拜访李总',
    time: '2小时',
    operateList: [
      { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
      { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
      { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
    ],
  },
  {
    key: '5',
    duration: '20:00-22:00',
    type: '日程',
    title: '拜访李总',
    time: '2小时',
    operateList: [
      { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
      { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
      { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
    ],
  },
];

const ContainerView = styled.View``;

const List = styled.FlatList`
  background-color: white;
  padding: ${moderateScale(10)}px ${moderateScale(15)}px 0px ${moderateScale(15)}px;
`;

class UpcomingTaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  keyExtractor = item => item.key;

  renderItem = ({ item }) => {
    const {
      duration,
      type,
      title,
      time,
      operateList,
    } = item;
    return (<ListItem
      duration={duration}
      type={type}
      title={title}
      time={time}
      operateList={operateList}
    />);
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

UpcomingTaskList.navigationOptions = () => ({
  title: '待办任务',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default UpcomingTaskList;
