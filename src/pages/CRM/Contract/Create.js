/**
 * @component Create.js
 * @description 新建合同页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import { DatePicker } from 'native-base';
import { routers, theme } from '../../../constants';
import { moderateScale } from '../../../utils/scale';
import { ContractEnum } from '../../../constants/form';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import { ContainerScrollView } from '../../../components/Styles/Layout';

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
            center={
              <CenterText>
                {
                  (customerId && customerName) ? null :
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
          <NavInputItem
            leftText="开始日期"
            center={
              <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale="cn"
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType="fade"
                androidMode="default"
                placeHolderText={ContractEnum.startDate}
                textStyle={{
                  ...theme.pickerStyle,
                  color: theme.textColor,
                }}
                placeHolderTextStyle={{
                  ...theme.pickerStyle,
                  color: theme.textPlaceholderColor,
                }}
                onDateChange={startDate => this.setState({ startDate })}
              />
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="结束日期"
            center={
              <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale="cn"
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType="fade"
                androidMode="default"
                placeHolderText={ContractEnum.endDate}
                textStyle={{
                  ...theme.pickerStyle,
                  color: theme.textColor,
                }}
                placeHolderTextStyle={{
                  ...theme.pickerStyle,
                  color: theme.textPlaceholderColor,
                }}
                onDateChange={endDate => this.setState({ endDate })}
              />
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>
                {
                  (departmentId && departmentName) ? null :
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
