/**
 * @component Create.js
 * @description 新建合同页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { routers, theme } from '../../../constants';
import { ContractEnum } from '../../../constants/form';
import { SelectType } from '../../../constants/enum';
import Toast from '../../../utils/toast';
import { formatDate } from '../../../utils/base';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { ListView, CenterText, RightText } from '../../../components/Styles/Form';
import DateTimePicker from '../../../components/DateTimePicker';

import ContractModel from '../../../logicStores/contract';

const formatDateType = 'yyyy-MM-dd hh:mm';

@observer
class Create extends React.Component {
  state = {
    name: null,
    customerId: null,
    customerName: null,
    totalMoney: null,
    startDate: null,
    endDate: null,
    departmentId: null,
    departmentName: null,
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
      totalMoney,
      startDate,
      endDate,
      departmentId,
    } = this.state;
    try {
      if (!name) throw new Error(ContractEnum.theme);
      if (!(customerId && customerName)) throw new Error(ContractEnum.customerName);
      if (!totalMoney) throw new Error(ContractEnum.totalMoney);
      if (!startDate) throw new Error(ContractEnum.startDate);
      if (!endDate) throw new Error(ContractEnum.endDate);
      if (!departmentId) throw new Error(ContractEnum.departmentName);
      ContractModel.createContractReq({
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
  render() {
    const {
      state: {
        name,
        customerId,
        customerName,
        totalMoney,
        departmentId,
        departmentName,
        startDate,
        endDate,
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
        <TitleItem text="必填信息" />
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
                  customerId: item.id,
                  customerName: item.name,
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
                  startDate: `${formatDate(date, formatDateType)}`,
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
                  endDate: `${formatDate(date,formatDateType)}`,
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
              {...theme.navItemStyle}
            />
          </DateTimePicker>
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
        </ListView>
        <HorizontalDivider height={41} />
        <CreateMoreButton
          onPress={() => navigate(routers.contractEditorMore)}
        />
      </ContainerScrollView>
    );
  }
}

Create.navigationOptions = ({ navigation }) => ({
  title: '新建合同',
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
