/**
 * @component index.js
 * @description 业绩统计页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RefreshControl } from 'react-native';
import { observer } from 'mobx-react/native';
import {theme, routers, theme as themeVar} from '../../../constants';

// components
import TabsPanel from '../../../components/TabsPanel';
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import TotalList from './components/TotalList';
import TitleHeader from './components/TitleHeader';
import LineChart from '../../../components/LineChart';
import SalesFunnel from './components/SalesFunnel';
import RankItem from './components/RankItem';

import PrefStatistModel from '../../../logicStores/prefStatist';

const SectionView = styled.ScrollView`
  padding-top: ${theme.moderateScale(8)};
`;

const DescriptionView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.moderateScale(15)}px;
`;

const DescriptionText = styled.Text`
  font-size: ${theme.moderateScale(12)};
  color: ${props => props.color || theme.textGrayColor};
`;


@observer
class PerfStatist extends React.Component {
  componentDidMount() {
    PrefStatistModel.getData();
  }

  renderRankItem = () => {
    const {
      salesRankMap: { list = [] },
    } = PrefStatistModel;
    // const rankList = [
    //   { avatar: null, shoppingGuideName: '张三', achievement: '999元' },
    // ];
    return list.map((_, i) => (
      <RankItem
        key={`${_.ownerName}.${_.completedTotalMoney}`}
        item={_}
        index={i}
        isLast={i === list.length - 1}
      />
    ));
  };
  renderSection = () => {
    const {
      tabMap: { list, selectedIndex },
      salesSumMap,
      salesRankingList,
      salesRankMap: { total, averAmount },
      refreshing,
      salesStatisticList,
    } = PrefStatistModel;
    const salesTotalProps = {
      list: [
        { title: '漏斗总值', text: `${salesSumMap.funnelSalesSum}元` },
        { title: '预计完成', text: `${salesSumMap.expectSalesSum}元` },
        { title: '完成总值', text: `${salesSumMap.completedSalesSum}元` },
      ],
    };
    const rankTotalProps = {
      list: [
        { title: '总人数', text: total },
        { title: '平均完成额', text: `${averAmount}元` },
      ],
    };
    const nowYear = new Date().getFullYear();
    return (
      <SectionView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.getData}
          />
        }
      >
        <TotalList {...salesTotalProps} />
        <TitleHeader
          containerStyle={{
            marginTop: 10,
            marginBottom: 4,
          }}
          titleStyle={{
            marginLeft: 7,
          }}
          title="销售趋势"
          imageSource={require('../../../img/crm/perfStatist/chart.png')}
        />
        <DescriptionView>
          <DescriptionText>
            金额（元）
          </DescriptionText>
          <DescriptionText
            color={theme.primaryColor}
          >
            {nowYear}年
          </DescriptionText>
        </DescriptionView>
        <LineChart
          data={salesRankingList}
          name={list[selectedIndex].name}
        />
        <TitleHeader
          containerStyle={{
            marginTop: 0,
            marginBottom: 25,
          }}
          titleStyle={{
            marginLeft: 5,
          }}
          title="销售漏斗"
          imageSource={require('../../../img/crm/perfStatist/funnel.png')}
        />
        <SalesFunnel
          list={salesStatisticList}
        />
        <TitleHeader
          containerStyle={{
            marginTop: 36,
            marginBottom: 20,
          }}
          titleStyle={{
            marginLeft: 5,
          }}
          title="业绩排行"
          imageSource={require('../../../img/rootTabBar/rank-focus.png')}
        />
        <TotalList {...rankTotalProps} />
        {this.renderRankItem()}
      </SectionView>
    );
  };
  render() {
    const {
      tabMap: { list, selectedIndex },
      onToggleTabSelectIndex,
    } = PrefStatistModel;
    return (
      <ContainerView
        backgroundColor={theme.whiteColor}
        bottomPadding
      >
        <CommStatusBar />
        <TabsPanel
          list={list}
          activeIndex={selectedIndex}
          onChange={onToggleTabSelectIndex}
        />
        {this.renderSection()}
      </ContainerView>
    );
  }
}

PerfStatist.navigationOptions = ({ navigation }) => ({
  title: '业绩统计',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      right="跟进统计"
      onPress={() => navigation.navigate(routers.followUpStat)}
      rightStyle={{
        color: themeVar.primaryColor,
      }}
    />
  ),
});

PerfStatist.defaultProps = {};

PerfStatist.propTypes = {
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

export default PerfStatist;
