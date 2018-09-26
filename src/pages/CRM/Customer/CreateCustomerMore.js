import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { LeftBackIcon, RightView, CommStatusBar } from '../../../components/Layout';
import { theme, routers } from '../../../constants';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import TouchableView from '../../../components/TouchableView';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import { CustomerEnum } from '../../../constants/form';
import { CustomerLevelTypes, industryTypes, SelectType } from '../../../constants/enum';
import { CenterText, RightText } from '../../../components/Styles/Form';
import { createLocationId } from '../../../service/app';
import CustomerModel from '../../../logicStores/customer';
import Toast from '../../../utils/toast';

class CreateCustomerMore extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      phone,
      locationDivision,
      locationInfo,
      provinceId,
      cityId,
      districtId,
      isActive,
      departmentId,
      departmentName,
    } = props.navigation.state.params;
    this.state = {
      // contactId: null,
      // code: null,
      name,
      // quickCode: null,
      // shortName: null,
      phone,
      fax: null,
      website: null,
      // locationId: null,
      locationDivision,
      locationInfo,
      provinceId,
      cityId,
      districtId,
      description: null,
      // pictureId: null,
      // ownerUserId: null,
      // ownerUserName: null,
      isActive,
      departmentId,
      departmentName,
      level: null,
      levelName: null,
      superiorCustomerId: null,
      superiorCustomerName: null,
      weibo: null,
      peopleNumber: null,
      salesNumber: null,
      industry: null,
      industryName: null,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = async () => {
    const {
      state: {
        // contactId,
        // code,
        name,
        // quickCode,
        // shortName,
        phone,
        fax,
        website,
        // locationId,
        locationDivision,
        locationInfo,
        provinceId,
        cityId,
        districtId,
        description,
        // pictureId,
        // ownerUserId,
        // ownerUserName,
        isActive,
        departmentId,
        departmentName,
        level,
        levelName,
        superiorCustomerId,
        weibo,
        peopleNumber,
        salesNumber,
        industry,
        industryName,
      },
      props: {
        navigation: { 
          pop,
          state: { params: { reFetchDataList } }, 
        },
      },
    } = this;
    try {
      if (!name) throw new Error(CustomerEnum.name);
      if (!levelName) throw new Error(CustomerEnum.levelName);
      if (!industryName) throw new Error(CustomerEnum.industryName);
      if (!locationDivision) throw new Error(CustomerEnum.locationDivision);
      if (!locationInfo) throw new Error(CustomerEnum.locationInfo);
      if (!phone) throw new Error(CustomerEnum.phone);
      if (!departmentName) throw new Error(CustomerEnum.departmentName);

      // 获取位置信息
      let locationId = null;
      if (locationInfo) {
        const { location: { id } } = await createLocationId({
          provinceId,
          cityId,
          districtId,
        });
        locationId = id;
      }

      CustomerModel.createCustomerReq({
        name,
        phone,
        fax,
        website,
        locationId,
        description,
        isActive,
        departmentId,
        level,
        weibo,
        peopleNumber,
        salesNumber,
        industry,
        superiorCustomerId,
      }, () => {
        reFetchDataList();
        pop(2);
      });
    } catch (error) {
      Toast.showError(error.message);
    }
  }

  render() {
    const {
      state: {
        // contactId,
        // code,
        name,
        // quickCode,
        // shortName,
        phone,
        fax,
        website,
        // locationId,
        locationDivision,
        locationInfo,
        description,
        // pictureId,
        // ownerUserId,
        // ownerUserName,
        // isActive,
        departmentId,
        departmentName,
        level,
        levelName,
        superiorCustomerId,
        superiorCustomerName,
        weibo,
        peopleNumber,
        salesNumber,
        industry,
        industryName,
      },
      props: { navigation: { navigate } },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
        backgroundColor={theme.whiteColor}
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
          })}
          right={
            <TouchableView onPress={() => navigate(routers.queryBusiness)}>
              <RightText>工商信息查询</RightText>
            </TouchableView>
          }
        />
        <NavInputItem
          leftText="客户级别"
          onPress={() => navigate(routers.typePicker, {
            selectedKey: level,
            typeEnum: CustomerLevelTypes,
            callback: (key, value) => {
              this.setState({
                level: key,
                levelName: value,
              });
            },
          })}
          center={
            <CenterText active={level && levelName}>
              {(level && levelName) ? levelName : CustomerEnum.level}
            </CenterText>
          }
          isLast
          {...theme.navItemStyle}
        />
        <NavInputItem
          leftText="上级客户"
          onPress={() => navigate(routers.customer, {
            type: SelectType,
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
            typeEnum: industryTypes,
            callback: (key, value) => {
              this.setState({
                industry: key,
                industryName: value,
              });
            },
          })}
          center={
            <CenterText active={industry && industryName}>
              {(industry && industryName) ? industryName : CustomerEnum.industry}
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
          onPress={() => {
              navigate(routers.cityPicker, {
                callback: ({ province, city, area }) => {
                  this.setState({
                    locationDivision: `${province},${city},${area}`,
                    provinceId: province,
                    cityId: city,
                    districtId: area,
                  });
                },
              });
            }}
          center={
            <CenterText active={locationDivision}>
              {
                  locationDivision || CustomerEnum.locationDivision
                }
            </CenterText>
            }
          {...theme.navItemStyle}
        />
        <NavInputItem
          leftText="详细地址"
          {...theme.getLeftStyle({
              placeholder: CustomerEnum.locationInfo,
              value: locationInfo,
              onChangeText: locationInfo => this.setState({ locationInfo }),
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
          leftText="传真"
          {...theme.getLeftStyle({
              placeholder: CustomerEnum.fax,
              value: fax,
              onChangeText: fax => this.setState({ fax }),
            })}
        />
        <NavInputItem
          leftText="微博"
          {...theme.getLeftStyle({
              placeholder: CustomerEnum.weibo,
              value: weibo,
              onChangeText: weibo => this.setState({ weibo }),
            })}
        />
        <NavInputItem
          leftText="网址"
          {...theme.getLeftStyle({
              placeholder: CustomerEnum.website,
              value: website,
              onChangeText: website => this.setState({ website }),
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
            placeholder: CustomerEnum.peopleNumber,
            value: peopleNumber,
            onChangeText: peopleNumber => this.setState({ peopleNumber }),
          })}
        />
        <NavInputItem
          leftText="年销售额"
          {...theme.getLeftStyle({
            placeholder: CustomerEnum.salesNumber,
            value: salesNumber,
            onChangeText: salesNumber => this.setState({ salesNumber }),
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
          />
        </TextareaGroup>
        <HorizontalDivider
          height={20}
        />
      </ContainerScrollView>
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
