/**
 * @component EditorMore.js
 * @description 编辑更多资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { View } from 'react-native';
import { theme as themeVar, routers } from '../../../constants';
import { ContractEnum } from '../../../constants/form';
import { CustomerType, SalesChanceType, ContactsType, PackType, PackStatus, PayType } from '../../../constants/enum';
import { formatDateByMoment, formatNumberToString } from '../../../utils/base';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { ListView, CenterText, RightText } from '../../../components/Styles/Form';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import DateTimePicker from '../../../components/DateTimePicker';
import { FormActionSheet } from '../../../components/Modal';

import ContractModel from '../../../logicStores/contract';

@observer
class EditorMore extends React.Component {
  state = {
    theme: null,
    customerId: null,
    customerName: null,
    salesOpportunitiesId: null,
    salesOpportunitiesName: null,
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
    ownerId: null,
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
        theme,
        customerId,
        customerName,
        type,
        totalMoney,
        startDate,
        endDate,
        departmentId,
        ownerId,
      },
      props: {
        navigation: { pop, state },
      },
    } = this;
    try {
      if (!theme) throw new Error(ContractEnum.theme);
      if (!type) throw new Error(ContractEnum.type);
      if (!(customerId && customerName)) throw new Error(ContractEnum.customerName);
      if (!totalMoney) throw new Error(ContractEnum.totalMoney);
      if (!startDate) throw new Error(ContractEnum.startDate);
      if (!endDate) throw new Error(ContractEnum.endDate);
      if (!departmentId) throw new Error(ContractEnum.departmentName);
      if (!ownerId) throw new Error(ContractEnum.ownerId);
      const { item: { id } = {} } = state.params || {};
      // 新增
      if (!id) {
        ContractModel.createContractReq(this.state, () => {
          pop(2);
        });
        return;
      }
      if (!id) throw new Error('id 不为空');
      ContractModel.updateContractReq(this.state, () => {
        pop(1);
      });
    } catch (e) {
      Toast.showWarning(e.message);
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
      startDate,
      endDate,
      pactDate,
    } = item;
    if (startDate) {
      startDate = formatDateByMoment(startDate);
    }
    if (endDate) {
      endDate = formatDateByMoment(endDate);
    }
    if (pactDate) {
      pactDate = formatDateByMoment(pactDate);
    }
    this.setState({
      ...formatNumberToString(item),
      startDate,
      endDate,
      pactDate,
    });
  };
  render() {
    const {
      state: {
        theme,
        customerId,
        customerName,
        salesOpportunitiesId,
        salesOpportunitiesName,
        type,
        status,
        payType,
        totalMoney,
        startDate,
        endDate,
        number,
        pactDate,
        ourContractId,
        ourContractName,
        customerContractId,
        customerContractName,
        departmentId,
        departmentName,
        content,
        comment,
        ownerId,
        ownerName,
      },
      props: {
        navigation: { navigate },
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
            {...themeVar.getLeftStyle({
              placeholder: ContractEnum.theme,
              value: theme,
              onChangeText: theme => this.setState({ theme }),
            })}
          />
          <NavInputItem
            leftText="客户"
            onPress={() => navigate(routers.customer, {
              type: CustomerType,
              callback: (item) => {
                if (!Object.keys(item).length) return;
                this.setState({
                  customerId: item.key,
                  customerName: item.title,
                });
              },
            })}
            center={
              <CenterText active={customerId && customerName}>
                {
                  (customerId && customerName) ? customerName :
                    ContractEnum.customerName
                }
              </CenterText>
            }
            {...themeVar.navItemStyle}
          />
          <NavInputItem
            leftText="销售机会"
            onPress={() => navigate(routers.salesChance, {
              type: SalesChanceType,
              callback: (item) => {
                if (!Object.keys(item).length) return;
                this.setState({
                  salesOpportunitiesId: item.key,
                  salesOpportunitiesName: item.title,
                });
              },
            })}
            center={
              <CenterText active={salesOpportunitiesId && salesOpportunitiesName}>
                {
                  (salesOpportunitiesId && salesOpportunitiesName) ? salesOpportunitiesName :
                    ContractEnum.salesOpportunities
                }
              </CenterText>
            }
            {...themeVar.navItemStyle}
          />
          <FormActionSheet
            onConfirm={({ key }) => {
              this.setState({
                type: key,
              });
            }}
            typeEnum={PackType}
          >
            <NavInputItem
              leftText="合同类型"
              needPress={false}
              center={
                <CenterText active={type}>
                  { type ? PackType[type] : ContractEnum.type }
                </CenterText>
              }
              {...themeVar.navItemStyle}
            />
          </FormActionSheet>
          <FormActionSheet
            onConfirm={({ key }) => {
              this.setState({
                status: key,
              });
            }}
            typeEnum={PackStatus}
          >
            <NavInputItem
              leftText="合同状态"
              needPress={false}
              center={
                <CenterText active={status}>
                  { status ? PackStatus[status] : ContractEnum.status }
                </CenterText>
              }
              {...themeVar.navItemStyle}
            />
          </FormActionSheet>
          <FormActionSheet
            onConfirm={({ key }) => {
              this.setState({
                payType: key,
              });
            }}
            typeEnum={PayType}
          >
            <NavInputItem
              leftText="付款方式"
              needPress={false}
              center={
                <CenterText active={payType}>
                  { payType ? PayType[payType] : ContractEnum.payType }
                </CenterText>
              }
              {...themeVar.navItemStyle}
            />
          </FormActionSheet>
          <NavInputItem
            leftText="总金额"
            {...themeVar.getLeftStyle({
              placeholder: ContractEnum.totalMoney,
              value: totalMoney,
              onChangeText: totalMoney => this.setState({ totalMoney }),
            })}
            right={
              <RightText>元</RightText>
            }
            {...themeVar.navItemStyle}
          />
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  startDate: `${formatDateByMoment(date)}`,
                })
            }
          >
            <NavInputItem
              leftText="开始日期"
              needPress={false}
              center={
                <CenterText active={startDate}>
                  { startDate || ContractEnum.startDate }
                </CenterText>
              }
              {...themeVar.navItemStyle}
            />
          </DateTimePicker>
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  endDate: `${formatDateByMoment(date)}`,
                })
            }
          >
            <NavInputItem
              leftText="结束日期"
              needPress={false}
              center={
                <CenterText active={endDate}>
                  { endDate || ContractEnum.endDate }
                </CenterText>
              }
              isLast
              {...themeVar.navItemStyle}
            />
          </DateTimePicker>
        </ListView>
        <TitleItem text="其他信息" />
        <ListView>
          <NavInputItem
            leftText="合同编号"
            {...themeVar.getLeftStyle({
              placeholder: ContractEnum.number,
              value: number,
              onChangeText: number => this.setState({ number }),
            })}
            height={44}
          />
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  pactDate: `${formatDateByMoment(date)}`,
                })
            }
          >
            <NavInputItem
              leftText="签约日期"
              needPress={false}
              center={
                <CenterText active={pactDate}>
                  { pactDate || ContractEnum.pactDate }
                </CenterText>
              }
              {...themeVar.navItemStyle}
            />
          </DateTimePicker>
          <NavInputItem
            leftText="我方签约人"
            onPress={() => navigate(routers.selectEmployee, {
              title: '选择我方签约人',
              callback: (item) => {
                if (!Object.keys(item).length) return;
                this.setState({
                  ourContractId: item.userId,
                  ourContractName: item.userName,
                });
              },
            })}
            center={
              <CenterText active={ourContractId && ourContractName}>
                {
                  (ourContractId && ourContractName) ? ourContractName :
                    ContractEnum.ourContract
                }
              </CenterText>
            }
            {...themeVar.navItemStyle}
            leftWidth={110}
          />
          <NavInputItem
            leftText="客户方签约人"
            onPress={() => {
              if (!customerId) {
                Toast.showError('请先选择客户');
                return;
              }
              navigate(routers.contacts, {
                type: ContactsType,
                customerId,
                callback: (item) => {
                  if (!Object.keys(item).length) return;
                  this.setState({
                    customerContractId: item.id,
                    customerContractName: item.name,
                  });
                },
              });
            }}
            center={
              <CenterText active={customerContractId && customerContractName}>
                {
                  (customerContractId && customerContractName) ? customerContractName :
                    ContractEnum.customerContractName
                }
              </CenterText>
            }
            {...themeVar.navItemStyle}
            leftWidth={110}
          />
          <NavInputItem
            leftText="所属部门"
            onPress={() => navigate(routers.selectDepartment, {
              id: departmentId,
              callback: (item) => {
                if (!Object.keys(item).length) return;
                this.setState({
                  departmentId: item.id,
                  departmentName: item.name,
                });
              },
            })}
            center={
              <CenterText active={departmentId && departmentName}>
                {
                  (departmentId && departmentName) ? departmentName :
                    ContractEnum.departmentName
                }
              </CenterText>
            }
            {...themeVar.navItemStyle}
          />
          <NavInputItem
            leftText="负责人"
            onPress={() => navigate(routers.selectEmployee, {
              callback: (item) => {
                if (!Object.keys(item).length) return;
                this.setState({
                  ownerId: item.userId,
                  ownerName: item.userName,
                });
              },
            })}
            center={
              <CenterText active={ownerId && ownerName}>
                {
                  (ownerId && ownerName) ? ownerName :
                    ContractEnum.ownerId
                }
              </CenterText>
            }
            {...themeVar.navItemStyle}
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
              placeholderTextColor={themeVar.textPlaceholderColor}
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
              placeholderTextColor={themeVar.textPlaceholderColor}
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
        color: themeVar.primaryColor,
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
