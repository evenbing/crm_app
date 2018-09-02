/**
 * @component index.js
 * @description 业绩统计页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../constants';

// components
import TabsPanel from '../../../components/TabsPanel';
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import TotalList from './components/TotalList';
import TitleHeader from './components/TitleHeader';
import LineChart from '../../../components/LineChart';
import SalesFunnel from './components/SalesFunnel';
import RankItem from './components/RankItem';

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

const TextView = styled.Text``;

const TabList = ['本月', '本季', '本年'];

class PerfStatist extends React.Component {
  state = {
    tabIndex: 0,
  };
  onChangeTab = (index) => {
    this.setState({ tabIndex: index });
  };
  renderRankItem = () => {
    const rankList = [
      { avatar: null, shoppingGuideName: '张三', achievement: '999元' },
      { avatar: null, shoppingGuideName: '张三三', achievement: '888元' },
      { avatar: null, shoppingGuideName: '李四', achievement: '777元' },
      { avatar: null, shoppingGuideName: '王五', achievement: '666元' },
      { avatar: null, shoppingGuideName: '李雷', achievement: '555元' },
      { avatar: null, shoppingGuideName: '韩梅梅', achievement: '444元' },
    ];
    return rankList.map((_, i) => (
      <RankItem
        key={_.shoppingGuideName}
        item={_}
        index={i}
        isLast={i === rankList.length - 1}
      />
    ));
  };
  renderSection = () => {
    const {
      state: {
        tabIndex,
      },
    } = this;
    const salesTotalProps = {
      list: [
        { title: '漏斗总值', text: '34567890.00元' },
        { title: '预计完成', text: '34567890.00元' },
        { title: '完成总值', text: '34567890.00元' },
      ],
    };
    const rankTotalProps = {
      list: [
        { title: '总人数', text: '6' },
        { title: '平均完成额', text: '34567890.00元' },
      ],
    };
    return (
      <SectionView>
        <TotalList {...salesTotalProps} />
        <TitleHeader
          containerStyle={{
            marginTop: 10,
            marginBottom: 4,
          }}
          titleStyle={{
            marginLeft: 7,
          }}
          imageSize={23}
          title="销售趋势"
        />
        <DescriptionView>
          <DescriptionText>
            金额（元）
          </DescriptionText>
          <DescriptionText
            color={theme.primaryColor}
          >
            2018年
          </DescriptionText>
        </DescriptionView>
        <LineChart
          data={[
            { dateId: '01', achievement: 10 },
            { dateId: '02', achievement: 13 },
            { dateId: '03', achievement: 5 },
            { dateId: '04', achievement: 25 },
            { dateId: '05', achievement: 35 },
            { dateId: '06', achievement: 15 },
            { dateId: '07', achievement: 20 },
            { dateId: '08', achievement: 45 },
            { dateId: '09', achievement: 8 },
            { dateId: '10', achievement: 13 },
            { dateId: '11', achievement: 34 },
            { dateId: '12', achievement: 15 },
          ]}
          name={TabList[tabIndex]}
        />
        <TitleHeader
          containerStyle={{
            marginTop: 0,
            marginBottom: 25,
          }}
          titleStyle={{
            marginLeft: 5,
          }}
          imageSize={24}
          title="销售漏斗"
        />
        <SalesFunnel />
        <TitleHeader
          containerStyle={{
            marginTop: 36,
            marginBottom: 20,
          }}
          titleStyle={{
            marginLeft: 5,
          }}
          imageSize={24}
          title="业绩排行"
        />
        <TotalList {...rankTotalProps} />
        {this.renderRankItem()}
      </SectionView>
    );
  };
  render() {
    const {
      state: {
        tabIndex,
      },
    } = this;
    return (
      <ContainerView
        backgroundColor={theme.whiteColor}
        bottomPadding
      >
        <CommStatusBar />
        <TabsPanel
          list={TabList}
          activeIndex={tabIndex}
          onChange={this.onChangeTab}
        >
          {this.renderSection()}
          <SectionView>
            <TotalList />
            <TextView>second page</TextView>
          </SectionView>
          <SectionView>
            <TotalList />
            <TextView>third page</TextView>
          </SectionView>
        </TabsPanel>
      </ContainerView>
    );
  }
}

PerfStatist.navigationOptions = ({ navigation, screenProps }) => ({
  title: '业绩统计',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

PerfStatist.defaultProps = {};

PerfStatist.propTypes = {};

export default PerfStatist;
