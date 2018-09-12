/**
 * @component EditorMore.js
 * @description 编辑更多资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
// import { DatePicker } from 'native-base';
import { View } from 'react-native';
import theme from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';
import { ContractEnum } from '../../../constants/form';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';

import ContractModel from '../../../logicStores/contract';

const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const CenterText = styled.Text`
  font-size: ${moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
`;

const RightText = CenterText.extend`
  color: ${theme.textColor};
`;

@observer
class EditorMore extends React.Component {
  state = {
    name: null,
    customerId: null,
    customerName: null,
    salesOpportunitiesId: null,
    type: null,
    status: null,
    payType: null,
    totalMoney: null,
    startDate: null,
    endDate: null,
    number: null,
    pactDate: null,
    ourContractId: null,
    customerContractId: null,
    customerContractName: null,
    departmentId: null,
    departmentName: null,
    content: null,
    comment: null,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => {
    const {
      name,
      customerId,
      customerName,
      salesOpportunitiesId,
      type,
      status,
      payType,
      totalMoney,
      startDate,
      endDate,
      number,
      pactDate,
      ourContractId,
      customerContractId,
      customerContractName,
      departmentId,
      departmentName,
      content,
      comment,
    } = this.state;
    try {
      if (!name) throw new Error(ContractEnum.theme);
      if (!(customerId && customerName)) throw new Error(ContractEnum.customerName);
      if (!totalMoney) throw new Error(ContractEnum.totalMoney);
      if (!startDate) throw new Error(ContractEnum.startDate);
      if (!endDate) throw new Error(ContractEnum.endDate);
      if (!departmentId) throw new Error(ContractEnum.departmentName);
      ContractModel.updateContractReq({
        theme: name,
        customerId,
        customerName,
        totalMoney,
        startDate,
        endDate,
        departmentId,
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  };
  getLeftStyle = (inputProps, width = 80) => {
    return {
      inputProps: {
        ...inputProps,
        fontSize: moderateScale(16),
      },
      leftTextStyle: {
        color: theme.textFormColor,
        width: moderateScale(width),
      },
      height: 44,
    };
  };
  render() {
    const {
      state: {
        name,
        // customerId,
        // customerName,
        // salesOpportunitiesId,
        // type,
        // status,
        // payType,
        // totalMoney,
        // startDate,
        // endDate,
        number,
        // pactDate,
        // ourContractId,
        // customerContractId,
        // customerContractName,
        // departmentId,
        // departmentName,
        content,
        comment,
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={9}
        />
        <TitleItem text="基本信息" />
        <ListView>
          <NavInputItem
            leftText="合同名称"
            {...theme.getLeftStyle({
              placeholder: ContractEnum.theme,
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
          <NavInputItem
            leftText="客户"
            center={
              <CenterText>{ContractEnum.customerName}</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="销售机会"
            center={
              <CenterText>{ContractEnum.salesOpportunities}</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="合同类型"
            center={
              <CenterText>{ContractEnum.type}</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="合同状态"
            center={
              <CenterText>{ContractEnum.status}</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="付款方式"
            center={
              <CenterText>{ContractEnum.payType}</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="总金额"
            {...theme.getLeftStyle({
              placeholder: ContractEnum.totalMoney,
              value: name,
              onChangeText: totalMoney => this.setState({ totalMoney }),
            })}
            right={
              <RightText>元</RightText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="开始日期"
            center={
              <CenterText>{ContractEnum.startDate}</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="结束日期"
            center={
              <CenterText>{ContractEnum.endDate}</CenterText>
            }
            isLast
            {...theme.navItemStyle}
          />
        </ListView>
        <TitleItem text="其他信息" />
        <ListView>
          <NavInputItem
            leftText="合同编号"
            {...theme.getLeftStyle({
              placeholder: ContractEnum.number,
              value: number,
              onChangeText: number => this.setState({ number }),
            })}
            height={44}
          />
          <NavInputItem
            leftText="签约日期"
            center={
              <CenterText>{ContractEnum.pactDate}</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="我方签约人"
            center={
              <CenterText>{ContractEnum.ourContract}</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="客户方签约人"
            center={
              <CenterText>{ContractEnum.customerContractName}</CenterText>
            }
            {...theme.navItemStyle}
            leftWidth={110}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>{ContractEnum.departmentName}</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="合同正文"
            center={<View />}
            right={<View />}
            height={44}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              value={content}
              onChangeText={content => this.setState({ content })}
              placeholder="请输入合同正文"
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
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
              placeholder="请输入备注说明"
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
        </ListView>
        <HorizontalDivider height={8} />
      </ContainerScrollView>
    );
  }
}

EditorMore.navigationOptions = ({ navigation }) => ({
  title: '合同更多资料',
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
