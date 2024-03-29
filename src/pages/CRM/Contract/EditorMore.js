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
import { CommStatusBar, DevicesUtil, LeftBackIcon, RightView, ToastUtil } from 'xn-react-native-applets';

// constants
import { theme as themeVar, routers } from 'constants';
import { ContractEnum } from 'constants/form';
import { CustomerType, SalesChanceType, ContactsType, PackType, PackStatus, PayType } from 'constants/enum';

// utils
import { formatDateByMoment, formatNumberToString, formatDateType, delay } from 'utils/base';
import { verifyDateTime } from 'utils/formVerify';

// logicStores
import ContractModel from 'logicStores/contract';

// components
import { ContainerScrollView } from 'components/Styles/Layout';
import { ListView, CenterText, RightText } from 'components/Styles/Form';
import { HorizontalDivider } from 'components/Styles/Divider';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import TitleItem from 'components/Details/TitleItem';
import NavInputItem from 'components/NavInputItem';
import DateTimePicker from 'components/DateTimePicker';
import { FormActionSheet } from 'components/Modal';

const { isIos } = DevicesUtil;

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
  onPressRight = async () => {
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
      await verifyDateTime(startDate, endDate);

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
      ToastUtil.showWarning(e.message);
    }
  };
  onFocus = async (y = 40) => {
    await delay();
    this.scrollViewRef.scrollTo({
      x: 0,
      y: themeVar.moderateScale(isIos() ? y : y + 30),
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
      startDateShow,
      startDate,
      endDateShow,
      endDate,
      pactDateShow,
      pactDate,
    } = item;
    const {
      salesleadName,
    } = item;
    if (startDate) {
      startDateShow = formatDateByMoment(startDate, formatDateType);
      startDate = formatDateByMoment(startDate);
    }
    if (endDate) {
      endDateShow = formatDateByMoment(endDate, formatDateType);
      endDate = formatDateByMoment(endDate);
    }
    if (pactDate) {
      pactDateShow = formatDateByMoment(pactDate, formatDateType);
      pactDate = formatDateByMoment(pactDate);
    }
    let salesOpportunitiesName = null;
    if (salesleadName) {
      salesOpportunitiesName = salesleadName;
    }
    this.setState({
      salesOpportunitiesName,
      ...formatNumberToString(item),
      startDateShow,
      startDate,
      endDateShow,
      endDate,
      pactDateShow,
      pactDate,
      ownerName: item.ownerUserName,
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
        startDateShow,
        endDateShow,
        number,
        pactDateShow,
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
        innerRef={(ref) => { this.scrollViewRef = ref; }}
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
                  salesOpportunitiesId: item.id,
                  salesOpportunitiesName: item.name,
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
                keyboardType: 'numeric',
                placeholder: ContractEnum.totalMoney,
                value: totalMoney,
                onChangeText: totalMoney => this.setState({ totalMoney }),
                onFocus: () => this.onFocus(200),
            })}
            right={
              <RightText>元</RightText>
            }
            {...themeVar.navItemStyle}
          />
          <DateTimePicker
            mode="date"
            onConfirm={
              date =>
                this.setState({
                  startDate: `${formatDateByMoment(date)}`,
                  startDateShow: `${formatDateByMoment(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="开始日期"
              needPress={false}
              center={
                <CenterText active={startDateShow}>
                  {startDateShow || ContractEnum.startDate }
                </CenterText>
              }
              {...themeVar.navItemStyle}
            />
          </DateTimePicker>
          <DateTimePicker
            mode="date"
            isEnd
            onConfirm={
              date =>
                this.setState({
                  endDate: `${formatDateByMoment(date)}`,
                  endDateShow: `${formatDateByMoment(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="结束日期"
              needPress={false}
              center={
                <CenterText active={endDateShow}>
                  {endDateShow || ContractEnum.endDate }
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
                onFocus: () => this.onFocus(300),
            })}
            height={44}
          />
          <DateTimePicker
            mode="date"
            onConfirm={
              date =>
                this.setState({
                  pactDate: `${formatDateByMoment(date)}`,
                  pactDateShow: `${formatDateByMoment(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="签约日期"
              needPress={false}
              center={
                <CenterText active={pactDateShow}>
                  { pactDateShow || ContractEnum.pactDate }
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
                ToastUtil.showError('请先选择客户');
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
              onFocus={() => this.onFocus(550)}
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
              onFocus={() => this.onFocus(720)}
              onBlur={() => this.onFocus(0)}
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
      onPress={navigation.state.params ? navigation.state.params.onPressRight : () => null}
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
