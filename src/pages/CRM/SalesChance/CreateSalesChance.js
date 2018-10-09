import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import { observer } from 'mobx-react/native';

import { LeftBackIcon, RightView, CommStatusBar } from '../../../components/Layout';
import { theme, routers } from '../../../constants';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { ContainerScrollView, ContainerView } from '../../../components/Styles/Layout';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import ProductItem from './components/ProductItem';
import productImage from '../../../img/crm/ico_product.png';
import AddProduct from './components/AddProduct';
import { SalesChanceEnum } from '../../../constants/form';
import { CustomerType, MarkActivityType } from '../../../constants/enum';
import { CenterText } from '../../../components/Styles/Form';
import SalesChanceStore from '../../../logicStores/salesChance';
import DateTimePicker from '../../../components/DateTimePicker';
import { formatDate } from '../../../utils/base';

const formatDateType = 'yyyy-MM-dd hh:mm';
const products = [
  {
    key: uuidv1(),
    discount: '折扣：80%',
    name: '电脑主机',
    price: '标准价格：2300',
    count: '数量：200',
    remark: '备注：被猪猪这猪',
    totalPrice: '总价：460000',
  },
  {
    key: uuidv1(),
    discount: '折扣：80%',
    name: '电脑主机',
    price: 2300,
    count: 200,
    remark: '被猪猪这猪',
    totalPrice: 460000,
  },
  {
    key: uuidv1(),
    discount: '折扣：80%',
    name: '电脑主机',
    price: 2300,
    count: 200,
    remark: '被猪猪这猪',
    totalPrice: 460000,
  },
];

@observer
class CreateSalesChance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      customerId: null,
      customerName: null,
      planAmount: null,
      salesPhaseId: null,
      salesPhaseName: null,
      expectedDate: null,
      description: null,
      departmentId: null,
      departmentName: null,
      activityId: null,
      activityName: null,
      opportunityType: null,
      sourceType: null,
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
        name,
        customerId,
        customerName,
        planAmount,
        salesPhaseId,
        salesPhaseName,
        expectedDate,
        description,
        departmentId,
        departmentName,
        activityId,
        activityName,
        opportunityType,
        sourceType,
      },
      props: { navigation: {
        goBack,
        state: { params: { reFetchDataList } },
      } },
    } = this;
    try {
      if (!name) throw new Error(SalesChanceEnum.name);
      if (!customerId || !customerName) throw new Error(SalesChanceEnum.customer);
      if (!activityId || !activityName) throw new Error(SalesChanceEnum.activity);
      if (!departmentId || !departmentName) throw new Error(SalesChanceEnum.department);

      SalesChanceStore.createSalesChanceReq({
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
        name,
        customerId,
        customerName,
        planAmount,
        salesPhaseId,
        salesPhaseName,
        expectedDate,
        description,
        departmentId,
        departmentName,
        activityId,
        activityName,
        opportunityType,
        sourceType,
      },
      props: { navigation: { navigate } },
    } = this;
    return (
      <ContainerView>
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
            leftText="姓名"
            {...theme.getLeftStyle({
                placeholder: SalesChanceEnum.name,
                value: name,
                onChangeText: name => this.setState({ name }),
              })}
          />
          <NavInputItem
            leftText="客户名称"
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
                    SalesChanceEnum.customer
                }
              </CenterText>
              }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="销售金额"
            {...theme.getLeftStyle({
              placeholder: SalesChanceEnum.planAmount,
              value: planAmount,
              onChangeText: planAmount => this.setState({ planAmount }),
            })}
          />
          <NavInputItem
            leftText="销售阶段"
            onPress={() => navigate(routers.salesPhasePicker, {
              callback: () => {},
            })}
            center={
              <CenterText active={salesPhaseId && salesPhaseName}>
                {
                  (salesPhaseId && salesPhaseName) ? salesPhaseName :
                    SalesChanceEnum.salesPhase
                }
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  expectedDate: `${formatDate(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="截止时间"
              needPress={false}
              center={
                <CenterText active={expectedDate}>
                  {expectedDate || SalesChanceEnum.expectedDate}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          {/* <NavInputItem
            leftText="市场活动"
            onPress={() => navigate(routers.markActivity, {
                type: MarkActivityType,
                callback: (item) => {
                  if (!Object.keys(item).length) return;
                  this.setState({
                    activityId: item.key,
                    activityName: item.title,
                  });
                },
              })}
            center={
              <CenterText active={activityId && activityName}>
                {
                    (activityId && activityName) ? activityName :
                      SalesChanceEnum.activity
                  }
              </CenterText>
              }
            {...theme.navItemStyle}
          /> */}
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
                    (departmentId && departmentName) ? departmentName : SalesChanceEnum.department
                  }
              </CenterText>
              }
            {...theme.navItemStyle}
          />
          <HorizontalDivider
            height={20}
          />
          <CreateMoreButton
            onPress={() => navigate(routers.salesChanceEditorMore)}
          />
          <HorizontalDivider
            height={40}
          />
          <TitleItem
            text="产品清单"
            fontSize={16}
            color="#969696"
          />
          {
            products.map(item => (
              <ProductItem
                key={item.key}
                image={productImage}
                discount={item.discount}
                name={item.name}
                price={item.price}
                count={item.count}
                remark={item.remark}
                totalPrice={item.totalPrice}
              />
            ))
          }
        </ContainerScrollView>
        <AddProduct
          count="20"
          totalPrice="900000"
        />
      </ContainerView>
    );
  }
}

CreateSalesChance.navigationOptions = ({ navigation }) => {
  const { 
    state: { param: { onPressRight = () => {} } },
    goBack,
  } = navigation;
  return ({
    title: '新建销售机会',
    headerLeft: (
      <LeftBackIcon
        onPress={() => goBack()}
      />
    ),
    headerRight: (
      <RightView
        onPress={onPressRight}
        right="完成"
        rightStyle={{
          color: theme.primaryColor,
        }}
      />
    ),
  });
};

CreateSalesChance.propTypes = {
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

export default CreateSalesChance;
