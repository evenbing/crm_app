/**
 * @component Create.js
 * @description 新增回款记录页面
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { View } from 'react-native';
import { CommStatusBar, LeftBackIcon, RightView, ToastUtil } from 'xn-react-native-applets';

// constants
import { routers, theme } from 'constants';
import { ReceivablePlanEnum, ReceivableRecordEnum } from 'constants/form';
import { PayType } from 'constants/enum';

// utils
import { formatDateByMoment, formatDateType } from 'utils/base';
import { moderateScale } from 'utils/scale';

// logicStores
import ReceivableModel from 'logicStores/receivable';

// components
import { ContainerView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import NavInputItem from 'components/NavInputItem';
import { ListView, CenterText, RightText } from 'components/Styles/Form';
import DateTimePicker from 'components/DateTimePicker';
import { FormActionSheet } from 'components/Modal';

const LeftViewWidth = moderateScale(110);

@observer
class Create extends React.Component {
  state = {
    receivablePrice: null,
    receivableDate: null,
    ownerId: null,
    ownerName: null,
    comment: null,
    typeMap: {
      key: null,
      value: null,
    },
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => {
    const {
      state: {
        receivablePrice,
        receivableDate,
        ownerId,
        comment,
        typeMap: { key: payType },
      },
      props: {
        navigation: {
          state,
          goBack,
        },
      },
    } = this;
    const { pactId, issueId, planId } = state.params || {};
    try {
      if (!pactId) throw new Error(ReceivableRecordEnum.pactId);
      if (!issueId) throw new Error(ReceivablePlanEnum.issueId);
      if (!planId) throw new Error(ReceivableRecordEnum.planId);
      if (!receivablePrice) throw new Error(ReceivableRecordEnum.receivablePrice);
      if (!receivableDate) throw new Error(ReceivableRecordEnum.receivableDate);
      if (!payType) throw new Error(ReceivableRecordEnum.payType);
      if (!ownerId) throw new Error(ReceivableRecordEnum.ownerId);
      ReceivableModel.createReceivableRecordReq({
        pactId,
        issueId,
        planId,
        receivablePrice,
        receivableDate,
        payType,
        ownerId,
        comment,
      }, () => {
        goBack();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  };
  onPressActionSheetItem = ({ key, value }) => {
    this.setState({
      typeMap: { key, value },
    });
  };
  render() {
    const {
      state: {
        receivablePrice,
        ownerId,
        ownerName,
        comment,
        receivableDateShow,
        typeMap,
      },
      props: {
        navigation: {
          navigate,
          state,
        },
      },
    } = this;
    const { period } = state.params || {};
    return (
      <ContainerView
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
              <CenterText
                active={period}
              >
                {period}
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="实际回款金额"
            {...theme.getLeftStyle({
              keyboardType: 'numeric',
              placeholder: ReceivableRecordEnum.receivablePrice,
              value: receivablePrice,
              onChangeText: receivablePrice => this.setState({ receivablePrice }),
            }, 110)}
            right={
              <RightText>元</RightText>
            }
            {...theme.navItemStyle}
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
              leftText="实际回款日期"
              needPress={false}
              center={
                <CenterText active={receivableDateShow}>
                  { receivableDateShow || ReceivableRecordEnum.receivableDate }
                </CenterText>
              }
              {...theme.navItemStyle}
              leftWidth={LeftViewWidth}
            />
          </DateTimePicker>
          <FormActionSheet
            onConfirm={this.onPressActionSheetItem}
            typeEnum={PayType}
          >
            <NavInputItem
              leftText="实付款方式"
              needPress={false}
              center={
                <CenterText active={typeMap.value}>
                  { typeMap.value || ReceivableRecordEnum.payType }
                </CenterText>
              }
              {...theme.navItemStyle}
              leftWidth={LeftViewWidth}
            />
          </FormActionSheet>
          <NavInputItem
            leftText="负责人"
            onPress={() => navigate(routers.selectEmployee, {
              callback: (obj) => {
                if (!Object.keys(obj).length) return;
                this.setState({
                  ownerId: obj.userId,
                  ownerName: obj.userName,
                });
              },
            })}
            center={
              <CenterText active={ownerId && ownerName}>
                {
                  (ownerId && ownerName) ? ownerName :
                    ReceivableRecordEnum.ownerId
                }
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="备注"
            center={<View />}
            right={<View />}
            height={44}
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
      </ContainerView>
    );
  }
}

Create.navigationOptions = ({ navigation }) => ({
  title: '新增回款记录',
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

Create.defaultProps = {};

Create.propTypes = {
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

export default Create;
