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
import { routers, theme } from '../../../constants';
import { moderateScale } from '../../../utils/scale';
import { ReceivablePlanEnum } from '../../../constants/form';
import Toast from '../../../utils/toast';
import { formatDate } from '../../../utils/base';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import NavInputItem from '../../../components/NavInputItem';
import { ListView, CenterText, RightText } from '../../../components/Styles/Form';
import DateTimePicker from '../../../components/DateTimePicker';

import ReceivableModel from '../../../logicStores/receivable';

const formatDateType = 'yyyy-MM-dd hh:mm';

@observer
class Create extends React.Component {
  state = {
    pactId: null,
    issueId: null,
    issueName: null,
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
      ReceivableModel.createReceivablePlanReq({
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
  render() {
    const {
      state: {
        issueId,
        issueName,
        receivablePrice,
        ownerId,
        ownerName,
        comment,
        receivableDate,
      },
      props: {
        navigation: {
          navigate,
          state,
        },
      },
    } = this;
    const { pactId } = state.params || {};
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
            onPress={() => navigate(routers.selectPeriod, {
              pactId,
              callback: (obj) => {
                if (!Object.keys(obj).length) return;
                debugger;
                this.setState({
                  ownerId: obj.id,
                  ownerName: obj.userName,
                });
              },
            })}
            center={
              <CenterText active={issueId}>
                {
                  (issueId && issueName) ? issueName :
                    ReceivablePlanEnum.issue
                }
              </CenterText>
            }
            {...theme.navItemStyle}
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
                  receivableDate: `${formatDate(date, formatDateType)}`,
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
            onPress={() => navigate(routers.selectEmployee, {
              callback: (obj) => {
                if (!Object.keys(obj).length) return;
                debugger;
                this.setState({
                  ownerId: obj.id,
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
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
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
