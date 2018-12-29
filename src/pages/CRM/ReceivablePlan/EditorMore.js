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
import { CommStatusBar, DevicesUtil, LeftBackIcon, RightView, ToastUtil } from 'xn-react-native-applets';

// constants
import { theme, routers } from 'constants';
import { ContractEnum, ReceivablePlanEnum } from 'constants/form';
import { DataTitleTypes } from 'constants/enum';

// utils
import { moderateScale } from 'utils/scale';
import { formatDateByMoment, formatNumberToString, formatDateType, delay } from 'utils/base';

// logicStores
import ReceivablePlanModel from 'logicStores/receivablePlan';

// components
import { ContainerScrollView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import NavInputItem from 'components/NavInputItem';
import { ListView, CenterText, RightText } from 'components/Styles/Form';
import DateTimePicker from 'components/DateTimePicker';
import { getReceivablePriceStatus, getDateTimeStatus } from './components/ActivityDetailsItem';

const { isIos } = DevicesUtil;
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
        id,
        pactId,
        issueId,
        receivablePrice,
        receivableDate,
        ownerId,
        comment,
        code,
      },
      props: {
        navigation: { pop },
      },
    } = this;
    try {
      if (!code) throw new Error(ReceivablePlanEnum.code);
      if (!id) throw new Error(ReceivablePlanEnum.id);
      if (!pactId) throw new Error(ReceivablePlanEnum.pactId);
      if (!issueId) throw new Error(ReceivablePlanEnum.issueId);
      if (!receivablePrice) throw new Error(ReceivablePlanEnum.receivablePrice);
      if (!receivableDate) throw new Error(ReceivablePlanEnum.receivableDate);
      if (!ownerId) throw new Error(ReceivablePlanEnum.ownerId);
      ReceivablePlanModel.updateReceivablePlanReq({
        code,
        id,
        pactId,
        issueId,
        receivablePrice,
        receivableDate,
        ownerId,
        comment,
      }, () => {
        pop(1);
      });
    } catch (e) {
      ToastUtil.showWarning(e.message);
    }
  };
  onFocus = async (y = 40) => {
    await delay();
    this.scrollViewRef.scrollTo({
      x: 0,
      y: theme.moderateScale(isIos() ? y : y + 30),
      animated: true,
    });
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
      receivableDateShow,
      creationTime,
    } = item;
    if (receivableDate) {
      receivableDateShow = formatDateByMoment(receivableDate, formatDateType);
      receivableDate = formatDateByMoment(receivableDate);
    }
    if (creationTime) {
      creationTime = formatDateByMoment(creationTime);
    }
    const formatPriceStatus = getReceivablePriceStatus(item) || null;
    const formatDateTimeStatus = getDateTimeStatus(item) || null;
    this.setState({
      ...formatNumberToString(item),
      receivableDate,
      receivableDateShow,
      creationTime,
      formatPriceStatus,
      formatDateTimeStatus,
    });
  };
  render() {
    const {
      state: {
        issueNumber,
        receivablePrice,
        ownerId,
        ownerUserName,
        pactName,
        createdByName,
        creationTime,
        comment,
        receivableDateShow,
        customerName,
        receivableFactPrice,
        departmentName,
        lastUpdatedByName,
        formatPriceStatus,
        formatDateTimeStatus,
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
        innerRef={(ref) => { this.scrollViewRef = ref; }}
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
            leftText="计划回款金额"
            {...theme.navItemOnlyShowStyle}
            {...theme.getLeftStyle({
              keyboardType: 'numeric',
              placeholder: ReceivablePlanEnum.receivablePrice,
              value: receivablePrice,
              onChangeText: receivablePrice => this.setState({ receivablePrice }),
            }, 110)}
            right={
              <RightText>元</RightText>
            }
          />
          <DateTimePicker
            mode="date"
            onConfirm={
              date =>
                this.setState({
                  receivableDate: `${formatDateByMoment(date)}`,
                  receivableDateShow: `${formatDateByMoment(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="计划回款日期"
              needPress={false}
              center={
                <CenterText active={receivableDateShow}>
                  { receivableDateShow || ReceivablePlanEnum.receivableDate }
                </CenterText>
              }
              {...theme.navItemOnlyShowStyle}
              leftWidth={moderateScale(110)}
            />
          </DateTimePicker>
          <NavInputItem
            leftText="负责人"
            onPress={() => navigate(routers.selectEmployee, {
                callback: (item) => {
                  if (!Object.keys(item).length) return;
                  this.setState({
                    ownerId: item.userId,
                    ownerUserName: item.userName,
                  });
                },
              })}
            center={
              <CenterText active={ownerId && ownerUserName}>
                {
                    (ownerId && ownerUserName) ? ownerUserName :
                      ContractEnum.ownerId
                  }
              </CenterText>
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
            leftText="实际回款金额"
            center={
              <CenterText active>{receivableFactPrice}</CenterText>
            }
            {...theme.navItemOnlyShowStyle}
            leftWidth={LeftViewWidth}
          />
          <NavInputItem
            leftText="本期回款状态"
            center={
              <CenterText active>
                {formatPriceStatus}
              </CenterText>
            }
            {...theme.navItemOnlyShowStyle}
            leftWidth={LeftViewWidth}
          />
          <NavInputItem
            leftText="本期逾期状态"
            center={
              <CenterText active>
                {formatDateTimeStatus}
              </CenterText>
            }
            {...theme.navItemOnlyShowStyle}
            leftWidth={LeftViewWidth}
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
          {/*
           <NavInputItem
            leftText="最近时间"
            center={
              <CenterText active>{lastUpdatedByName}</CenterText>
            }
            {...theme.navItemOnlyShowStyle}
          />
           */}
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
              onFocus={() => this.onFocus(400)}
              onBlur={() => this.onFocus(0)}
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
      onPress={navigation.state.params ? navigation.state.params.onPressRight : () => null}
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
