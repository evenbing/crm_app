/**
 * @component EditorMore.js
 * @description 编辑回款记录页面
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { View } from 'react-native';
import theme from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';
import {ReceivablePlanEnum, ReceivableRecordEnum} from '../../../constants/form';
import Toast from '../../../utils/toast';
import { formatDateByMoment } from '../../../utils/base';
import { DataTitleTypes, PayType } from '../../../constants/enum';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import NavInputItem from '../../../components/NavInputItem';
import { ListView, CenterText, RightText } from '../../../components/Styles/Form';
import DateTimePicker from '../../../components/DateTimePicker';

import ReceivableRecordModel from '../../../logicStores/receivableRecord';

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
      state: {
        code,
        id,
        pactId,
        issueId,
        planId,
        receivablePrice,
        receivableDate,
        payType,
        ownerId,
        comment,
      },
      props: {
        navigation: { pop },
      },
    } = this;
    try {
      if (!code) throw new Error(ReceivablePlanEnum.code);
      if (!id) throw new Error(ReceivableRecordEnum.id);
      if (!pactId) throw new Error(ReceivableRecordEnum.pactId);
      if (!issueId) throw new Error(ReceivableRecordEnum.issueId);
      if (!planId) throw new Error(ReceivableRecordEnum.planId);
      if (!receivablePrice) throw new Error(ReceivableRecordEnum.receivablePrice);
      if (!receivableDate) throw new Error(ReceivableRecordEnum.receivableDate);
      if (!payType) throw new Error(ReceivableRecordEnum.payType);
      if (!ownerId) throw new Error(ReceivableRecordEnum.ownerId);
      ReceivableRecordModel.updateReceivableRecordReq({
        code,
        id,
        pactId,
        issueId,
        planId,
        receivablePrice,
        receivableDate,
        payType,
        ownerId,
        comment,
      }, () => {
        pop(1);
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
    if (!Object.keys(item).length) return;
    let {
      receivableDate,
      receivablePrice,
      creationTime,
    } = item;
    if (receivableDate) {
      receivableDate = formatDateByMoment(receivableDate);
    }
    if (receivablePrice) {
      receivablePrice = String(receivablePrice);
    }
    if (creationTime) {
      creationTime = formatDateByMoment(creationTime);
    }
    this.setState({
      ...item,
      receivableDate,
      receivablePrice,
      creationTime,
    });
  };
  render() {
    const {
      state: {
        issueNumber,
        receivablePrice,
        ownerUserName,
        pactName,
        comment,
        receivableDate,
        createdByName,
        creationTime,
        departmentName,
        customerName,
        payType,
        lastUpdatedByName,
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
            center={
              <CenterText active>
                {
                  typeof issueNumber !== 'undefined' ?
                    DataTitleTypes[issueNumber - 1] : null
                }
              </CenterText>
            }
            {...theme.navItemOnlyShowStyle}
          />
          <NavInputItem
            leftText="实际回款金额"
            {...theme.getLeftStyle({
              placeholder: '请输入金额',
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
              leftText="实际回款日期"
              needPress={false}
              center={
                <CenterText active={receivableDate}>
                  { receivableDate || ReceivableRecordEnum.receivableDate }
                </CenterText>
              }
              {...theme.navItemStyle}
              leftWidth={LeftViewWidth}
            />
          </DateTimePicker>
          <NavInputItem
            leftText="负责人"
            center={
              <CenterText active>{ownerUserName}</CenterText>
            }
            {...theme.navItemOnlyShowStyle}
          />
          <NavInputItem
            leftText="合同"
            center={
              <CenterText active>{pactName}</CenterText>
            }
            {...theme.navItemOnlyShowStyle}
          />
          <NavInputItem
            leftText="客户名称"
            center={
              <CenterText active>{customerName}</CenterText>
            }
            {...theme.navItemOnlyShowStyle}
          />
          <NavInputItem
            leftText="付款方式"
            center={
              <CenterText active>
                {
                  payType ? PayType[payType] : null
                }
              </CenterText>
            }
            {...theme.navItemOnlyShowStyle}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText active>{departmentName}</CenterText>
            }
            {...theme.navItemOnlyShowStyle}
          />
          <NavInputItem
            leftText="创建人"
            center={
              <CenterText active>{createdByName}</CenterText>
            }
            {...theme.navItemOnlyShowStyle}
          />
          <NavInputItem
            leftText="创建时间"
            center={
              <CenterText active>{creationTime}</CenterText>
            }
            {...theme.navItemOnlyShowStyle}
          />
          <NavInputItem
            leftText="最近修改人"
            center={
              <CenterText active>{lastUpdatedByName}</CenterText>
            }
            {...theme.navItemOnlyShowStyle}
            leftWidth={LeftViewWidth}
          />
          <NavInputItem
            leftText="最近时间"
            center={
              <CenterText active>{}</CenterText>
            }
            {...theme.navItemOnlyShowStyle}
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
              placeholder={ReceivableRecordEnum.comment}
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
  title: '编辑回款记录',
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
