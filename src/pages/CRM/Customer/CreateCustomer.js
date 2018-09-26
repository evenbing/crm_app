/**
 * @component CreateCustomer.js
 * @description 新增客户页面
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { theme, routers } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import ScanCard from '../../../components/Create/ScanCard';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import TouchableView from '../../../components/TouchableView';
import { CustomerEnum } from '../../../constants/form';
import { CenterText, RightText } from '../../../components/Styles/Form';
import Toast from '../../../utils/toast';
import CustomerModel from '../../../logicStores/customer';
import { createLocationId } from '../../../service/app';

class CreateCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // contactId: null,
      // code: null,
      name: null,
      // quickCode: null,
      // shortName: null,
      phone: null,
      // fax: null,
      // website: null,
      // locationId: null,
      locationDivision: null,
      locationInfo: null,
      provinceId: null,
      cityId: null,
      districtId: null,
      // description: null,
      // pictureId: null,
      // ownerUserId: null,
      // ownerUserName: null,
      isActive: true,
      departmentId: null,
      departmentName: null,
      // level: null,
      // superiorCustomerId: null,
      // weibo: null,
      // peopleNumber: null,
      // salesNumber: null,
      // industry: null,
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
        // fax,
        // website,
        locationDivision,
        locationInfo,
        provinceId,
        cityId,
        districtId,
        // description,
        // pictureId,
        // ownerUserId,
        // ownerUserName,
        isActive,
        departmentId,
        departmentName,
        // level,
        // superiorCustomerId,
        // weibo,
        // peopleNumber,
        // salesNumber,
        // industry,
      },
      props: { navigation: { 
        goBack,
        state: { params: { reFetchDataList } },
      } },
    } = this;
    try {
      if (!name) throw new Error(CustomerEnum.name);
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
        locationId,
        isActive,
        departmentId,
      }, () => {
        reFetchDataList();
        goBack();
      });
    } catch (error) {
      Toast.error(error.message);
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
        // fax,
        // website,
        // locationId,
        locationDivision,
        locationInfo,
        provinceId,
        cityId,
        districtId,
        // description,
        // pictureId,
        // ownerUserId,
        // ownerUserName,
        isActive,
        departmentId,
        departmentName,
        // level,
        // superiorCustomerId,
        // weibo,
        // peopleNumber,
        // salesNumber,
        // industry,
      },
      props: { navigation: { 
        navigate,
        push,
        state: { params: { reFetchDataList } },
      } },
    } = this;
    return (
      <ContainerScrollView 
        bottomPadding 
        backgroundColor={theme.whiteColor}
      >
        <CommStatusBar />
        <ScanCard
          onPress={() => alert(1)}
        />
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
          right={
            <TouchableView onPress={() => navigate(routers.queryBusiness)}>
              <RightText>工商信息查询</RightText>
            </TouchableView>
            }
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
          onPress={() => push(routers.createCustomerMore, {
            reFetchDataList,
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
