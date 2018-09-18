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
import { SelectType, PackType } from '../../../constants/enum';
import Toast from '../../../utils/toast';
import { formatDate, mapToArray } from '../../../utils/base';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { ListView, CenterText, RightText } from '../../../components/Styles/Form';
import DateTimePicker from '../../../components/DateTimePicker';
import Thumbnail from '../../../components/Thumbnail';
import { ActionSheet } from '../../../components/Modal';

import ContractModel from '../../../logicStores/contract';

const formatDateType = 'yyyy-MM-dd hh:mm:ss';

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
    typeMap: {
      key: null,
      value: null,
    },
    typeVisible: false,
    activityIndex: 0,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => {
    const {
      state: {
        name,
        customerId,
        customerName,
        typeMap: { key: type },
        totalMoney,
        startDate,
        endDate,
        departmentId,
      },
      props: {
        navigation: { goBack },
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
      ContractModel.createContractReq({
        theme: name,
        type,
        customerId,
        customerName,
        totalMoney,
        startDate,
        endDate,
        departmentId,
      }, () => {
        goBack();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  };
  onToggleVisible = () => {
    this.setState({
      typeVisible: !this.state.typeVisible,
    });
  };
  onPressActionSheetItem = ({ item, index }) => {
    if (this.state.activityIndex === index) return;
    this.setState({
      activityIndex: index,
      typeMap: { key: item.key, value: item.leftText },
    });
  };
  getRightElem = (index) => {
    const { activityIndex } = this.state;
    if (activityIndex !== index) return null;
    return (
      <Thumbnail
        source={require('../../../img/modal/ok.png')}
        size={16}
      />
    );
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
        typeMap,
        typeVisible,
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    const PackTypeList = mapToArray(PackType, 'leftText').map((v, i) => {
      v.rightText = this.getRightElem(i);
      return v;
    });
    const actionSheetProps = {
      isVisible: typeVisible,
      onPressClose: this.onToggleVisible,
      onPressItem: this.onPressActionSheetItem,
      list: PackTypeList,
    };
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={9}
        />
        <ActionSheet {...actionSheetProps} />
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
            leftText="合同类型"
            onPress={this.onToggleVisible}
            center={
              <CenterText active={typeMap.value}>
                { typeMap.value || ContractEnum.type }
              </CenterText>
            }
            {...theme.navItemStyle}
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
                  endDate: `${formatDate(date, formatDateType)}`,
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
