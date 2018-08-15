/**
 * @component index.js
 * @description 联系人页面
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
import TouchableView from '../../../components/TouchableView';
import { ActionSheet } from '../../../components/Modal';
import LeftItem from './component/LeftItem';

const FooterView = styled(TouchableView)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${theme.moderateScale(49)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${theme.whiteColor};
  border: 1px solid ${theme.borderColor};
`;

const FooterText = styled.Text`
  color: ${theme.primaryColor};
  font-size: ${theme.moderateScale(18)};
  font-family: ${theme.fontMedium};
`;

useStrict(true);

@observer
class ReimbursementPlan extends React.Component {
  state = {
    activeIndex: 0,
    amountVisible: false,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onToggleAmountVisible = () => {
    this.setState({
      amountVisible: !this.state.amountVisible,
    });
  };
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
        ref={(row) => { this[`rows.${index}`] = row; }}
        rightOpenValue={-theme.moderateScale((44 * 2) + 15 + 15)}
        style={{
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          backgroundColor: '#fff',
          borderBottomWidth: 0,
        }}
        preview
        previewOpenValue={-theme.moderateScale((44 * 2) + 15 + 15)}
        onRowOpen={() => this.onRowOpen(index)}
        body={
          <ListItem
            {...props}
            right="hidden"
            left={
              <LeftItem {...props} />
            }
            onPress={() => navigate(routers.reimbursementPlanDetail)}
          />
        }
        right={
          <ButtonList
            list={[1, 2]}
            onPressItem={({ index, item }) => alert(`item:${JSON.stringify(item)}, index: ${index}`)}
          />
        }
      />
    );
  };
  render() {
    const {
      state: {
        activeIndex,
        amountVisible,
      },
    } = this;
    const amountActionSheetProps = {
      isVisible: amountVisible,
      onPressClose: this.onToggleAmountVisible,
      itemNeedPress: false,
      list: [
        { leftText: '总金额', rightText: '¥100,000,00', rightStyle: { color: theme.dangerColor } },
        { leftText: '计划回款金额', rightText: '¥90,000,00' },
        { leftText: '实际回款金额', rightText: '¥70,000,00' },
        { leftText: '未回款金额', rightText: '¥100,000,00' },
        { leftText: '逾期未回款金额', rightText: '¥100,000,00' },
      ],
    };
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
              time: '20180909-0001',
              customer: '客户：西风网络',
              contract: '合同：西风网络销售合同',
              returnMoney: '计划回款：¥10,000.00',
              returnTime: '计划日期：2018-09-09',
            },
            {
              time: '20180909-0002',
              customer: '客户：阿里巴巴',
              contract: '合同：西风网络销售合同',
              returnMoney: '计划回款：¥10,000.00',
              returnTime: '计划日期：2018-09-09',
            },
            {
              time: '20180909-0003',
              customer: '客户：字节跳动',
              contract: '合同：西风网络销售合同',
              returnMoney: '计划回款：¥10,000.00',
              returnTime: '计划日期：2018-09-09',
            },
          ]}
          keyExtractor={item => item.time}
          renderItem={this.renderItem}
        />
        <ActionSheet {...amountActionSheetProps} />
        <FooterView onPress={this.onToggleAmountVisible}>
          <FooterText>数据合计</FooterText>
        </FooterView>
      </ContainerView>
    );
  }
}

ReimbursementPlan.navigationOptions = ({ navigation, screenProps }) => ({
  title: '回款计划',
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

ReimbursementPlan.defaultProps = {};

ReimbursementPlan.propTypes = {
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

export default ReimbursementPlan;

