/**
 * @component FollowUpStat.js
 * @description 跟进统计页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import { theme } from '../../../constants';

// components
import TabsPanel from '../../../components/TabsPanel';
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import FlatListTable from '../../../components/FlatListTable';
import FollowUpItem from './components/FollowUpItem';

import PrefStatistModel from '../../../logicStores/prefStatist';

const VerticalDivider = styled.View`
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #DDDDDD;
  left: ${theme.moderateScale(85)};
  top: ${theme.moderateScale(54)};
`;

@observer
class FollowUpStat extends React.Component {
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    PrefStatistModel.getFollowUpStatisticListReq();
  };
  render() {
    const {
      followUpTabMap: { list: tabList, selectedIndex },
      followUpList: { refreshing },
      onToggleFollowUpTabSelectIndex,
      getFollowUpList: followList,
    } = PrefStatistModel;
    const flatProps = {
      data: followList,
      renderItemElem: <FollowUpItem maxValue={followList.maxValue} />,
      onRefresh: this.getData,
      refreshing,
      noDataBool: !refreshing && followList.length === 0,
    };
    return (
      <ContainerView
        backgroundColor={theme.whiteColor}
        bottomPadding
      >
        <CommStatusBar />
        <TabsPanel
          list={tabList}
          activeIndex={selectedIndex}
          headerTextSize={14}
          onChange={onToggleFollowUpTabSelectIndex}
        />
        <HorizontalDivider height={6} />
        <FlatListTable {...flatProps} />
        {
          followList.length ? <VerticalDivider /> : null
        }
      </ContainerView>
    );
  }
}

FollowUpStat.navigationOptions = ({ navigation }) => ({
  title: '跟进统计',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

FollowUpStat.defaultProps = {};

FollowUpStat.propTypes = {};

export default FollowUpStat;
