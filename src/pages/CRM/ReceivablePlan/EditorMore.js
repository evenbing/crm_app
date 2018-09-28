/**
 * @component EditorMore.js
 * @description 回款计划更多页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { View } from 'react-native';
import theme from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';
import { ReceivablePlanEnum } from '../../../constants/form';
import Toast from '../../../utils/toast';
import { formatDateByMoment } from '../../../utils/base';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import NavInputItem from '../../../components/NavInputItem';
import { ListView, CenterText, RightText } from '../../../components/Styles/Form';
import DateTimePicker from '../../../components/DateTimePicker';


import ReceivablePlanModel from '../../../logicStores/receivablePlan';

const LeftViewWidth = moderateScale(110);

@observer
class EditorMore extends React.Component {
  state = {
    pactId: null,
    issueId: null,
    receivablePrice: null,
    receivableDate: null,
    ownerId: null,
    comment: null,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.initState();
  }
  onPressRight = () => {
    const {
      pactId,
      issueId,
      receivablePrice,
      receivableDate,
      ownerId,
      comment,
    } = this.state;
    try {
      if (!pactId) throw new Error(ReceivablePlanEnum.pactId);
      if (!issueId) throw new Error(ReceivablePlanEnum.issue);
      if (!receivablePrice) throw new Error(ReceivablePlanEnum.receivablePrice);
      if (!receivableDate) throw new Error(ReceivablePlanEnum.receivableDate);
      if (!ownerId) throw new Error(ReceivablePlanEnum.ownerId);
      ReceivablePlanModel.updateReceivablePlanReq({
        pactId,
        issueId,
        receivablePrice,
        receivableDate,
        ownerId,
        comment,
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  };
  initState = () => {
    const {
      props: {
        navigation: { state },
      },
    } = this;
    const { item = {} } = state.params || {};
    if (!Object.keys(item)) return;
    this.setState({ ...item });
  };
  render() {
    const {
      state: {
        issueId,
        receivablePrice,
        ownerId,
        comment,
        receivableDate,
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={12}
        />
        <ListView>
          <NavInputItem
            leftText="回款期次"
            {...theme.getLeftStyle({
              placeholder: ReceivablePlanEnum.issue,
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="计划回款金额"
            {...theme.navItemStyle}
            {...theme.getLeftStyle({
              placeholder: ReceivablePlanEnum.receivablePrice,
              value: receivablePrice,
              onChangeText: receivablePrice => this.setState({ receivablePrice }),
            }, 110)}
            right={
              <RightText>元</RightText>
            }
          />
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  receivableDate: `${formatDateByMoment(date)}`,
                })
            }
          >
            <NavInputItem
              leftText="计划回款日期"
              needPress={false}
              center={
                <CenterText active={receivableDate}>
                  { receivableDate || ReceivablePlanEnum.receivableDate }
                </CenterText>
              }
              {...theme.navItemStyle}
              leftWidth={moderateScale(110)}
            />
          </DateTimePicker>
          <NavInputItem
            leftText="负责人"
            center={
              <CenterText>
                {
                  ownerId ? null :
                    ReceivablePlanEnum.ownerId
                }
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="合同"
            {...theme.getLeftStyle({
              placeholder: '请输入合同',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="客户名称"
            {...theme.getLeftStyle({
              placeholder: '请输入客户名称',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="实际回款金额"
            {...theme.getLeftStyle({
              placeholder: '请输入金额',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            }, LeftViewWidth)}
          />
          <NavInputItem
            leftText="本期回款状态"
            center={
              <CenterText>请选择回款状态</CenterText>
            }
            {...theme.navItemStyle}
            leftWidth={LeftViewWidth}
          />
          <NavInputItem
            leftText="本期逾期状态"
            center={
              <CenterText>请选择逾期状态</CenterText>
            }
            {...theme.navItemStyle}
            leftWidth={LeftViewWidth}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>请选择所属部门</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="负责人"
            {...theme.getLeftStyle({
              placeholder: '请输入负责人',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>请选择所属部门</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="创建人"
            {...theme.getLeftStyle({
              placeholder: '请输入创建人',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="创建时间"
            center={
              <CenterText>请选择创建时间</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="最近修改人"
            {...theme.getLeftStyle({
              placeholder: '请输入修改人',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="最近时间"
            center={
              <CenterText>请选择最近时间</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="备注"
            center={<View />}
            right={<View />}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              value={comment}
              onChangeText={comment => this.setState({ comment })}
              placeholder={ReceivablePlanEnum.comment}
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
        </ListView>
        <HorizontalDivider height={20} />
      </ContainerScrollView>
    );
  }
}

EditorMore.navigationOptions = ({ navigation }) => ({
  title: '回款计划更多',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

EditorMore.defaultProps = {};

EditorMore.propTypes = {
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

export default EditorMore;
