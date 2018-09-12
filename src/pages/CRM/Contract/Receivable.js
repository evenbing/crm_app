import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import styled from 'styled-components';

import { ContainerView } from '../../../components/Styles/Layout';
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { moderateScale } from '../../../utils/scale';
import ReceivableTitle from './components/ReceivableTitle';
import ReceivableList from './components/ReceivableList';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { theme, routers } from '../../../constants';

const data = [
  {
    data: [
      { key: uuidv1(), type: '计划', time: '2018-09-09', amount: '¥98989898.08', status: '未完成' },
      { key: uuidv1(), type: '计划', time: '2018-09-09', amount: '¥98989898.08', status: '未完成' },
      { key: uuidv1(), type: '计划', time: '2018-09-09', amount: '¥98989898.08', status: '未完成' },
    ],
    title: '第一期',
  },
  {
    data: [
      { key: uuidv1(), type: '计划', time: '2018-09-09', amount: '¥98989898.08', status: '未完成' },
      { key: uuidv1(), type: '任务', time: '2018-09-09', amount: '¥98989898.08', status: '未完成' },
      { key: uuidv1(), type: '任务', time: '2018-09-09', amount: '¥98989898.08', status: '未完成' },
    ],
    title: '第二期',
  },
  {
    data: [
      { key: uuidv1(), type: '任务', time: '2018-09-09', amount: '¥98989898.08', status: '未完成' },
      { key: uuidv1(), type: '任务', time: '2018-09-09', amount: '¥98989898.08', status: '未完成' },
      { key: uuidv1(), type: '计划', time: '2018-09-09', amount: '¥98989898.08', status: '未完成' },
    ],
    title: '第三期',
  },
];

const RightViews = styled.View`
  flex-direction: row;
`;

class Receivable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <ReceivableTitle progress={0.5} />
        <HorizontalDivider height={moderateScale(10)} />
        <ReceivableList
          data={data}
        />
      </ContainerView>
    );
  }
}

Receivable.navigationOptions = ({ navigation }) => ({
  title: '回款',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightViews>
      <RightView
        onPress={() => { navigation.navigate(routers.receivablePlanCreate); }}
        right="增加计划"
        rightStyle={{
          color: theme.primaryColor,
        }}
        rightViewStyle={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
      />
      <RightView
        onPress={() => { navigation.navigate(routers.receivableRecordCreate); }}
        right="增加记录"
        rightStyle={{
          color: theme.primaryColor,
        }}
        rightViewStyle={{
          paddingLeft: moderateScale(8),
          paddingRight: moderateScale(15),
        }}
      />
    </RightViews>
  ),
});

export default Receivable;
