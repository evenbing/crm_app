/**
 * @component CreateCustomer.js
 * @description 新增客户页面
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';

// constants
import { theme, routers } from '../../../constants';

// utils
import Toast from '../../../utils/toast';
import { verifyPhone } from '../../../utils/formVerify';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
// import ScanCard from '../../../components/Create/ScanCard';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import { CustomerEnum } from '../../../constants/form';
import { CenterText } from '../../../components/Styles/Form';

import CustomerModel from '../../../logicStores/customer';

@observer
class CreateCustomer extends React.Component {
  state = {
    name: null,
    phone: null,
    locationInfo: {},
    departmentId: null,
    departmentName: null,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = async () => {
    const {
      state: {
        name,
        phone,
        locationInfo,
        departmentId,
        departmentName,
      },
      props: {
        navigation: { goBack },
      },
    } = this;
    try {
      if (!name) throw new Error(CustomerEnum.name);
      if (!phone) throw new Error(CustomerEnum.phone);
      await verifyPhone(phone);
      if (!(locationInfo && Object.keys(locationInfo).length)) throw new Error(CustomerEnum.location);
      if (!locationInfo.address) throw new Error(CustomerEnum.address);
      if (!departmentName) throw new Error(CustomerEnum.departmentName);

      CustomerModel.createCustomerReq({
        name,
        phone,
        locationInfo,
        departmentId,
      }, () => {
        goBack();
      });
    } catch (error) {
      Toast.showWarning(error.message);
    }
  };

  render() {
    const {
      state: {
        name,
        phone,
        locationInfo,
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
        backgroundColor={theme.whiteColor}
      >
        <CommStatusBar />
        {/* <ScanCard
          onPress={() => alert(1)}
        /> */}
        <TitleItem
          text="必填信息"
          fontSize={16}
        />
        <NavInputItem
          leftText="客户名称"
          {...theme.getLeftStyle({
            placeholder: CustomerEnum.name,
            value: name,
            onChangeText: name => this.setState({ name }),
          })}
        />
        <NavInputItem
          leftText="省份地市"
          onPress={() => navigate(routers.cityPicker, {
            callback: (item) => {
              if (!Object.keys(item).length) return;
              this.setState({
                locationInfo: {
                  ...locationInfo,
                  ...item,
                },
              });
            },
          })}
          center={
            <CenterText active={locationInfo.formatLocation}>
              { locationInfo.formatLocation || CustomerEnum.location }
            </CenterText>
          }
          {...theme.navItemStyle}
        />
        <NavInputItem
          leftText="详细地址"
          {...theme.getLeftStyle({
            placeholder: CustomerEnum.address,
            value: locationInfo.address,
            onChangeText: address => this.setState({
              locationInfo: {
                ...locationInfo,
                address,
              },
            }),
          })}
        />
        <NavInputItem
          leftText="电话"
          {...theme.getLeftStyle({
            placeholder: CustomerEnum.phone,
            value: phone,
            onChangeText: phone => this.setState({ phone }),
          })}
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
                (departmentId && departmentName) ? departmentName : CustomerEnum.departmentName
              }
            </CenterText>
            }
          isLast
          {...theme.navItemStyle}
        />
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.createCustomerMore, {
            item: this.state,
          })}
        />
      </ContainerScrollView>
    );
  }
}

CreateCustomer.navigationOptions = ({ navigation }) => ({
  title: '新建客户',
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

CreateCustomer.defaultProps = {};

CreateCustomer.propTypes = {
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

export default CreateCustomer;
