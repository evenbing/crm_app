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
import { theme, routers } from '../../../constants';
import { ContractEnum } from '../../../constants/form';
import { SelectType, PackType } from '../../../constants/enum';
import { formatDateByMoment } from '../../../utils/base';
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
    name: null,
    customerId: null,
    customerName: null,
    salesOpportunitiesId: null,
    typeMap: {
      key: null,
      value: null,
    },
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
        name,
        customerId,
        customerName,
        salesOpportunitiesId,
        typeMap: { key: type },
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
        content,
        comment,
        ownerId,
      },
      props: {
        navigation: { pop },
      },
    } = this;
    try {
      if (!name) throw new Error(ContractEnum.theme);
      if (!type) throw new Error(ContractEnum.type);
      if (!(customerId && customerName)) throw new Error(ContractEnum.customerName);
      if (!totalMoney) throw new Error(ContractEnum.totalMoney);
      if (!startDate) throw new Error(ContractEnum.startDate);
      if (!endDate) throw new Error(ContractEnum.endDate);
      if (!departmentId) throw new Error(ContractEnum.departmentName);
      if (!ownerId) throw new Error(ContractEnum.ownerId);
      const { item: { id } = {} } = this.props.navigation.state.params || {};
      // 新增
      if (!id) {
        debugger;
        ContractModel.createContractReq({
          theme: name,
          type,
          customerId,
          customerName,
          salesOpportunitiesId,
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
          ownerId,
          content,
          comment,
        }, () => {
          pop(2);
        });
        return;
      }
      if (!id) throw new Error('id 不为空');
      ContractModel.updateContractReq({
        theme: name,
        customerId,
        customerName,
        totalMoney,
        startDate,
        endDate,
        departmentId,
      }, () => {
        pop(1);
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  };
  onPressActionSheetItem = ({ key, value }) => {
    this.setState({
      typeMap: { key, value },
    });
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
        name,
        customerId,
        customerName,
        // salesOpportunitiesId,
        typeMap,
        // status,
        // payType,
        totalMoney,
        startDate,
        endDate,
        number,
        pactDate,
        // ourContractId,
        // customerContractId,
        // customerContractName,
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
            {...theme.getLeftStyle({
              placeholder: ContractEnum.theme,
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
          <NavInputItem
            leftText="客户"
            onPress={() => navigate(routers.customer, {
              type: SelectType,
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
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="销售机会"
            center={
              <CenterText>{ContractEnum.salesOpportunities}</CenterText>
            }
            {...theme.navItemStyle}
          />
          <FormActionSheet
            onConfirm={this.onPressActionSheetItem}
            typeEnum={PackType}
          >
            <NavInputItem
              leftText="合同类型"
              needPress={false}
              center={
                <CenterText active={typeMap.value}>
                  { typeMap.value || ContractEnum.type }
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </FormActionSheet>
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
              value: totalMoney,
              onChangeText: totalMoney => this.setState({ totalMoney }),
            })}
            right={
              <RightText>元</RightText>
            }
            {...theme.navItemStyle}
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
              {...theme.navItemStyle}
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
              {...theme.navItemStyle}
            />
          </DateTimePicker>
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
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  endDate: `${formatDateByMoment(date)}`,
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
              {...theme.navItemStyle}
            />
          </DateTimePicker>
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
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="负责人"
            onPress={() => navigate(routers.selectEmployee, {
              callback: (obj) => {
                if (!Object.keys(obj).length) return;
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
                    ContractEnum.ownerId
                }
              </CenterText>
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
