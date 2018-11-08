/**
 * @component Create.js
 * @description 新建合同页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';

// constants
import { routers, theme as themeVar } from '../../../constants';
import { ContractEnum } from '../../../constants/form';
// import { CustomerType, PackType } from '../../../constants/enum';
import { CustomerType } from '../../../constants/enum';

// utils
import { formatDateByMoment } from '../../../utils/base';
import { verifyDateTime } from '../../../utils/formVerify';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { ListView, CenterText, RightText } from '../../../components/Styles/Form';
import DateTimePicker from '../../../components/DateTimePicker';
// import { FormActionSheet } from '../../../components/Modal';

import ContractModel from '../../../logicStores/contract';

@observer
class Create extends React.Component {
  state = {
    theme: null,
    customerId: null,
    customerName: null,
    totalMoney: null,
    startDate: null,
    startDateShow: '',
    endDate: null,
    endDateShow: '',
    departmentId: null,
    departmentName: null,
    // type: null,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = async () => {
    const {
      state: {
        theme,
        customerId,
        customerName,
        // type,
        totalMoney,
        startDate,
        endDate,
        departmentId,
        ownerId,
      },
      props: {
        navigation: { goBack },
      },
    } = this;
    try {
      if (!theme) throw new Error(ContractEnum.theme);
      // if (!type) throw new Error(ContractEnum.type);
      if (!(customerId && customerName)) throw new Error(ContractEnum.customerName);
      if (!totalMoney) throw new Error(ContractEnum.totalMoney);
      if (!startDate) throw new Error(ContractEnum.startDate);
      if (!endDate) throw new Error(ContractEnum.endDate);
      if (!departmentId) throw new Error(ContractEnum.departmentName);
      if (!ownerId) throw new Error(ContractEnum.ownerId);
      await verifyDateTime(startDate, endDate);

      ContractModel.createContractReq({
        theme,
        // type,
        customerId,
        customerName,
        totalMoney,
        startDate,
        endDate,
        departmentId,
        ownerId,
      }, () => {
        goBack();
      });
    } catch (e) {
      Toast.showWarning(e.message);
    }
  };
  render() {
    const {
      state: {
        theme,
        customerId,
        customerName,
        totalMoney,
        departmentId,
        departmentName,
        startDateShow,
        startDate,
        endDateShow,
        endDate,
        // type,
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
        <TitleItem text="必填信息" />
        <ListView>
          <NavInputItem
            leftText="合同名称"
            {...themeVar.getLeftStyle({
              placeholder: ContractEnum.theme,
              value: theme,
              onChangeText: theme => this.setState({ theme }),
            })}
          />
          {/* <FormActionSheet
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
          </FormActionSheet> */}
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
            leftText="总金额"
            {...themeVar.getLeftStyle({
              keyboardType: 'numeric',
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
                  startDateShow: `${formatDateByMoment(date, 'YYYY-MM-DD')}`,
                })
            }
          >
            <NavInputItem
              leftText="开始日期"
              needPress={false}
              center={
                <CenterText active={startDate && startDateShow}>
                  { startDateShow || ContractEnum.startDate }
                </CenterText>
            }
              {...themeVar.navItemStyle}
            />
          </DateTimePicker>
          <DateTimePicker
            isEnd
            onConfirm={
              date =>
                this.setState({
                  endDate: `${formatDateByMoment(date)}`,
                  endDateShow: `${formatDateByMoment(date, 'YYYY-MM-DD')}`,
                })
            }
          >
            <NavInputItem
              leftText="结束日期"
              needPress={false}
              center={
                <CenterText active={endDate && endDateShow}>
                  { endDateShow || ContractEnum.endDate }
                </CenterText>
              }
              {...themeVar.navItemStyle}
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
            {...themeVar.navItemStyle}
          />
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
                    ContractEnum.ownerId
                }
              </CenterText>
            }
            {...themeVar.navItemStyle}
          />
        </ListView>
        <HorizontalDivider height={41} />
        <CreateMoreButton
          onPress={() => navigate(routers.contractEditorMore, {
            item: this.state,
          })}
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
        color: themeVar.primaryColor,
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
