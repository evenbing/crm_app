/**
 * @component Create.js
 * @description 新增回款计划页面
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
import { ReceivablePlanEnum } from 'constants/form';

// utils
import { formatDateByMoment, formatDateType } from 'utils/base';
import { moderateScale } from 'utils/scale';

// components
import { ContainerView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import NavInputItem from 'components/NavInputItem';
import { ListView, CenterText, RightText } from 'components/Styles/Form';
import DateTimePicker from 'components/DateTimePicker';

// logicStores
import ReceivableModel from 'logicStores/receivable';

@observer
class Create extends React.Component {
  state = {
    receivablePrice: null,
    receivableDate: null,
    ownerId: null,
    ownerName: null,
    comment: null,
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
      },
      props: {
        navigation: {
          state,
          goBack,
        },
      },
    } = this;
    const { pactId, issueId } = state.params || {};
    try {
      if (!pactId) throw new Error(ReceivablePlanEnum.pactId);
      if (!issueId) throw new Error(ReceivablePlanEnum.issueId);
      if (!receivablePrice) throw new Error(ReceivablePlanEnum.receivablePrice);
      if (!receivableDate) throw new Error(ReceivablePlanEnum.receivableDate);
      if (!ownerId) throw new Error(ReceivablePlanEnum.ownerId);
      ReceivableModel.createReceivablePlanReq({
        pactId,
        issueId,
        receivablePrice,
        receivableDate,
        ownerId,
        comment,
      }, () => {
        goBack();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
    }
  };
  render() {
    const {
      state: {
        receivablePrice,
        ownerId,
        ownerName,
        comment,
        receivableDateShow,
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
            leftText="计划回款金额"
            {...theme.navItemStyle}
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
              {...theme.navItemStyle}
              leftWidth={moderateScale(110)}
            />
          </DateTimePicker>
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
                    ReceivablePlanEnum.ownerId
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
              placeholder={ReceivablePlanEnum.comment}
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
        </ListView>
      </ContainerView>
    );
  }
}

Create.navigationOptions = ({ navigation }) => ({
  title: '新增回款计划',
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
