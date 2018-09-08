import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

import { ContainerView } from '../../../components/Styles/Layout';
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { moderateScale } from '../../../utils/scale';
import ReceivableTitle from './components/ReceivableTitle';
import ReceivableList from './components/ReceivableList';
import { HorizontalDivider } from '../../../components/Styles/Divider';

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

class Receivable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <ReceivableTitle />
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
});

export default Receivable;
