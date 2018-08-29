/**
 * @component index.js
 * @description 销售线索页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useStrict } from 'mobx';
import { SwipeRow } from 'native-base';
import { observer } from 'mobx-react/native';
import {routers, theme} from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout/index';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import { ScreenTab, ListItem, ButtonList } from '../../../components/Customer/index';
import FlatListTable from '../../../components/FlatListTable';

useStrict(true);

@observer
class SalesClues extends React.Component {
  state = {
    activeIndex: 0,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => alert('right');
  onChange = ({ index, isLast }) => {
    this.setState({ activeIndex: index });
    if (isLast) {
      // TODO open drawer
      alert('isLast');
    }
  };
  onRowOpen = (index) => {
    console.log(index);
    this.safeCloseOpenRow(index);
    this.prevNodeIndex = index;
  };
  safeCloseOpenRow = (index) => {
    if (this.prevNodeIndex !== index && typeof this.prevNodeIndex !== 'undefined') {
      this[`rows.${this.prevNodeIndex}`]._root.closeRow();
    }
  };
  renderItem = (props) => {
    const { index } = props;
    const {
      navigation: { navigate },
    } = this.props;
    return (
      <SwipeRow
        disableRightSwipe
        ref={(row) => { this[`rows.${props.index}`] = row; }}
        rightOpenValue={-theme.moderateScale(44 + 15 + 15)}
        style={{
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          backgroundColor: '#fff',
          borderBottomWidth: 0,
        }}
        onRowOpen={() => this.onRowOpen(index)}
        body={
          <ListItem
            {...props}
            onPress={() => navigate(routers.markActivityDetails)}
          />
        }
        right={
          <ButtonList
            list={[
              require('../../../img/crm/buttonList/follow.png'),
            ]}
            onPressItem={({ index, item }) => alert(`item:${JSON.stringify(item)}, index: ${index}`)}
          />
        }
      />
    );
  };
  render() {
    const {
      state: { activeIndex },
    } = this;
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <SearchInput placeholder="输入客户名称" />
        <ScreenTab
          data={['跟进时间', '我负责的', '筛选']}
          activeIndex={activeIndex}
          onChange={this.onChange}
        />
        <FlatListTable
          data={[
            {
              title: '网络会议',
              tipList: [
                '开始时间：2018-09-09 12:00',
                '结束时间：2018-09-010 12:00',
              ],
              status: 0,
            },
            {
              title: '安放展会',
              tipList: [
                '开始时间：2018-09-09 12:00',
                '结束时间：2018-09-010 12:00',
              ],
              status: 1,
            },
            {
              title: '电话会议',
              tipList: [
                '开始时间：2018-09-09 12:00',
                '结束时间：2018-09-010 12:00',
              ],
              status: 0,
            },
          ]}
          keyExtractor={item => item.title}
          renderItem={this.renderItem}
        />

      </ContainerView>
    );
  }
}

SalesClues.navigationOptions = ({ navigation, screenProps }) => ({
  title: '市场活动',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="新增"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

SalesClues.defaultProps = {};

SalesClues.propTypes = {
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

export default SalesClues;

