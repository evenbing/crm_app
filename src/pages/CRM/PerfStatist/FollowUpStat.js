/**
 * @component FollowUpStat.js
 * @description 跟进统计页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon } from 'xn-react-native-applets';

// constants
import { theme } from 'constants';

// components
import TabsPanel from 'components/TabsPanel';
import { ContainerView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import FlatListTable from 'components/FlatListTable';
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
      onToggleFollowUpTabSelectIndex,
      getFollowUpList: { list, maxValue, refreshing },
    } = PrefStatistModel;
    const flatProps = {
      data: list,
      renderItemElem: <FollowUpItem maxValue={maxValue} />,
      onRefresh: this.getData,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
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
          list.length ? <VerticalDivider /> : null
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
