/**
 * @component EditorMore.js
 * @description 客户编辑更多资料页面
 * @time 2018/8/13
 * @author
 */
import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';

// constants
import { theme, routers } from '../../../constants';
import { CustomerEnum } from '../../../constants/form';
import { CustomerLevelTypes, IndustryTypes, CustomerType } from '../../../constants/enum';

// utils
import { isIos } from '../../../utils/utils';
import { verifyPhone, verifyLink } from '../../../utils/formVerify';
import { formatLocationMap, formatNumberToString } from '../../../utils/base';
import Toast from '../../../utils/toast';

// components
import { LeftBackIcon, RightView, CommStatusBar } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import { CenterText, RightText } from '../../../components/Styles/Form';

import CustomerModel from '../../../logicStores/customer';

class CreateCustomerMore extends React.Component {
  state = {
    name: null,
    phone: null,
    fax: null,
    website: null,
    locationInfo: {},
    description: null,
    departmentId: null,
    departmentName: null,
    level: null,
    superiorCustomerId: null,
    superiorCustomerName: null,
    weibo: null,
    peopleNumber: null,
    salesNumber: null,
    industry: null,
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
        name,
        phone,
        locationInfo,
        departmentId,
        departmentName,
        level,
        industry,
        website,
      },
      props: {
        navigation: { pop, state },
      },
    } = this;
    try {
      if (!name) throw new Error(CustomerEnum.name);
      if (!phone) throw new Error(CustomerEnum.phone);
      const errMsg = await verifyPhone(phone);
      if (errMsg) throw new Error(errMsg);
      if (!(locationInfo && Object.keys(locationInfo).length)) throw new Error(CustomerEnum.location);
      if (!locationInfo.address) throw new Error(CustomerEnum.address);
      if (!level) throw new Error(CustomerEnum.level);
      if (!industry) throw new Error(CustomerEnum.industry);
      if (!(departmentId && departmentName)) throw new Error(CustomerEnum.departmentName);
      if (website) await verifyLink(website);

      const { item: { id } = {} } = state.params || {};
      // 新增
      if (!id) {
        CustomerModel.createCustomerReq(this.state, () => {
          pop(2);
        });
        return;
      }
      if (!id) throw new Error('id 不为空');
      CustomerModel.updateCustomerReq(this.state, () => {
        pop(1);
      });
    } catch (error) {
      Toast.showWarning(error.message);
    }
  };
  onFocus = (y = 40) => {
    this.scrollViewRef.scrollTo({
      x: 0,
      y: theme.moderateScale(y),
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
    const {
      location,
    } = item;
    let locationInfo = {};
    if (location) {
      locationInfo = location;
      locationInfo.formatLocation = formatLocationMap(location, false);
      locationInfo.address = location.address || '';
    }
    this.setState({
      locationInfo,
      ...formatNumberToString(item),
    });
  };
  render() {
    const {
      state: {
        name,
        phone,
        fax,
        website,
        locationInfo,
        description,
        departmentId,
        departmentName,
        level,
        superiorCustomerId,
        superiorCustomerName,
        weibo,
        peopleNumber,
        salesNumber,
        industry,
      },
      props: { navigation: { navigate } },
    } = this;
    return (
      <KeyboardAvoidingView
        behavior={isIos() ? 'padding' : null}
        style={{ flex: 1 }}
      >
        <ContainerScrollView
          bottomPadding
          backgroundColor={theme.whiteColor}
          innerRef={(ref) => { this.scrollViewRef = ref; }}
        >
          <CommStatusBar />
          <TitleItem
            text="基本信息"
            fontSize={16}
            titleBackColor="transparent"
          />
          <NavInputItem
            leftText="客户名称"
            {...theme.getLeftStyle({
              placeholder: CustomerEnum.name,
              value: name,
              onChangeText: name => this.setState({ name }),
              onFocus: () => this.onFocus(),
              onBlur: () => this.onFocus(0),
            })}
          />
          <NavInputItem
            leftText="客户级别"
            onPress={() => navigate(routers.typePicker, {
              selectedKey: level,
              typeEnum: CustomerLevelTypes,
              callback: (key) => {
                this.setState({
                  level: key,
                });
              },
            })}
            center={
              <CenterText active={level}>
                {level ? CustomerLevelTypes[level] : CustomerEnum.level}
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="上级客户"
            onPress={() => navigate(routers.customer, {
              type: CustomerType,
              callback: (item) => {
                const {
                  key,
                  title,
                } = item;
                this.setState({
                  superiorCustomerId: key,
                  superiorCustomerName: title,
                });
              },
            })}
            center={
              <CenterText active={superiorCustomerId && superiorCustomerName}>
                {(superiorCustomerId && superiorCustomerName) ? superiorCustomerName : CustomerEnum.superiorCustomerName}
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="所属行业"
            onPress={() => navigate(routers.typePicker, {
              selectedKey: industry,
              typeEnum: IndustryTypes,
              callback: (key) => {
                this.setState({
                  industry: key,
                });
              },
            })}
            center={
              <CenterText active={industry}>
                {industry ? IndustryTypes[industry] : CustomerEnum.industry}
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
          />
          <TitleItem
            text="联系信息"
            fontSize={16}
            titleBackColor="transparent"
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
              onFocus: () => this.onFocus(100),
            })}
          />
          <NavInputItem
            leftText="电话"
            {...theme.getLeftStyle({
              keyboardType: 'numeric',
              placeholder: CustomerEnum.phone,
              value: phone,
              onChangeText: phone => this.setState({ phone }),
              onFocus: () => this.onFocus(150),
            })}
          />
          <NavInputItem
            leftText="传真"
            {...theme.getLeftStyle({
              placeholder: CustomerEnum.fax,
              value: fax,
              onChangeText: fax => this.setState({ fax }),
              onFocus: () => this.onFocus(200),
            })}
          />
          <NavInputItem
            leftText="微博"
            {...theme.getLeftStyle({
              placeholder: CustomerEnum.weibo,
              value: weibo,
              onChangeText: weibo => this.setState({ weibo }),
              onFocus: () => this.onFocus(250),
            })}
          />
          <NavInputItem
            leftText="网址"
            {...theme.getLeftStyle({
              placeholder: CustomerEnum.website,
              value: website,
              onChangeText: website => this.setState({ website }),
              onFocus: () => this.onFocus(300),
            })}
          />
          <TitleItem
            text="其它信息"
            fontSize={16}
            titleBackColor="transparent"
          />
          <NavInputItem
            leftText="总人数"
            {...theme.getLeftStyle({
              keyboardType: 'numeric',
              placeholder: CustomerEnum.peopleNumber,
              value: peopleNumber,
              onChangeText: peopleNumber => this.setState({ peopleNumber }),
              onFocus: () => this.onFocus(350),
            })}
            right={
              <RightText>人</RightText>
            }
          />
          <NavInputItem
            leftText="年销售额"
            {...theme.getLeftStyle({
              keyboardType: 'numeric',
              placeholder: CustomerEnum.salesNumber,
              value: salesNumber,
              onChangeText: salesNumber => this.setState({ salesNumber }),
              onFocus: () => this.onFocus(430),
            })}
            right={
              <RightText>元</RightText>
            }
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
          <NavInputItem
            leftText="描述"
            height={44}
            center={<View />}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              value={description}
              onChangeText={description => this.setState({ description })}
              placeholder="请输入备注说明"
              placeholderTextColor={theme.textPlaceholderColor}
              onFocus={() => this.onFocus(500)}
              onBlur={() => this.onFocus(0)}
            />
          </TextareaGroup>
          <HorizontalDivider
            height={20}
          />
        </ContainerScrollView>
      </KeyboardAvoidingView>
    );
  }
}

CreateCustomerMore.navigationOptions = ({ navigation }) => ({
  title: '更多客户信息',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : () => {}}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

CreateCustomerMore.propTypes = {
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

export default CreateCustomerMore;
