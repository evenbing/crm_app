/**
 * @component CreateSalesChance.js
 * @description 创建销售机会
 * @time 2018/9/4
 * @author --
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';

// constants
import { theme, routers } from 'constants';
import { SalesChanceEnum } from 'constants/form';
import { CustomerType, MarkActivityType } from 'constants/enum';

// utils
import { formatDateByMoment, formatDateType } from 'utils/base';
import Toast from 'utils/toast';

// logicStores
import SalesChanceStore from 'logicStores/salesChance';
import BusinessStore from 'logicStores/business';

// components
import { LeftBackIcon, RightView, CommStatusBar } from 'components/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import { ContainerScrollView, ContainerView } from 'components/Styles/Layout';
import TitleItem from 'components/Details/TitleItem';
import NavInputItem from 'components/NavInputItem';
import CreateMoreButton from 'components/Create/CreateMoreButton';
import { CenterText, RightText } from 'components/Styles/Form';
import DateTimePicker from 'components/DateTimePicker';
import ProductItem from './components/ProductItem';
import AddProduct from './components/AddProduct';

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
      expectedDateShow: null,
      departmentId: null,
      departmentName: null,
      activityId: null,
      activityName: null,
      priceId: null,
      priceName: null,
      budinessProducts: [],
    };

    this.productsExtra = [];
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
        departmentId,
        departmentName,
        priceId,
        budinessProducts,
      },
      props: { navigation: {
        goBack,
      } },
    } = this;
    try {
      if (!name) throw new Error(SalesChanceEnum.name);
      if (!expectedDate) throw new Error(SalesChanceEnum.expectedDate);
      if (!customerId || !customerName) throw new Error(SalesChanceEnum.customer);
      if (!salesPhaseId || !salesPhaseName) throw new Error(SalesChanceEnum.salesPhase);
      if (!planAmount) throw new Error(SalesChanceEnum.planAmount);
      if (!departmentId || !departmentName) throw new Error(SalesChanceEnum.department);

      SalesChanceStore.createSalesChanceReq(this.state, (id) => {
        if (budinessProducts.length > 0 && id) {
          const businessDetails = budinessProducts.map(({
            id: productId,
            productName,
            standardPrice,
            salesPrice,
            salesNumber,
            salesTotalPrice,
            comment,
            discount,
            tenantId,
          }) => ({
            opportunityId: id,
            productId,
            productName,
            standardPrice,
            salesPrice,
            salesNumber,
            salesTotalPrice,
            comment,
            discount,
            tenantId,
            priceId,
          }));
          BusinessStore.createBusinessReq({ businessDetails });
        }
        goBack();
      });
    } catch (error) {
      Toast.showError(error.message);
    }
  }

  onAddProduct = () => {
    const {
      state: {
        budinessProducts,
        priceId,
        priceName,
      },
      props: { navigation: { navigate } },
    } = this;
    navigate(routers.productPicker, {
      products: budinessProducts,
      priceId,
      priceName,
      callback: ({
        products,
        priceId,
        priceName,
      }) => {
        this.setState({
          budinessProducts: products,
          priceId,
          priceName,
        });
      },
    });
  }

  modifyProductPrice = item => () => {
    const {
      state: { budinessProducts },
      props: { navigation: { navigate } },
    } = this;
    navigate(routers.salesChanceModifyProductPrice, {
      ...item,
      callback: (product) => {
        const arr = budinessProducts.map((p) => {
          if (p.id === product.id) {
            return product;
          }
          return p;
        });
        this.setState({ budinessProducts: arr });
      },
    });
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
        expectedDateShow,
        departmentId,
        departmentName,
        activityId,
        activityName,
        budinessProducts,
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
          />
          <NavInputItem
            leftText="机会名称"
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
              keyboardType: 'numeric',
              placeholder: SalesChanceEnum.planAmount,
              value: planAmount,
              onChangeText: planAmount => this.setState({ planAmount }),
            })}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="销售阶段"
            onPress={() => navigate(routers.salesPhasePicker, {
              selectedKey: salesPhaseId,
              callback: (salesPhaseId, salesPhaseName) => {
                this.setState({
                  salesPhaseId,
                  salesPhaseName,
                });
              },
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
            mode="date"
            onConfirm={
              date =>
                this.setState({
                  expectedDate: formatDateByMoment(date),
                  expectedDateShow: formatDateByMoment(date, formatDateType),
                })
            }
          >
            <NavInputItem
              leftText="结单日期"
              needPress={false}
              center={
                <CenterText active={expectedDateShow}>
                  {expectedDateShow || SalesChanceEnum.expectedDate}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          <NavInputItem
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
            onPress={() => navigate(routers.salesChanceEditorMore, {
              item: this.state,
            })}
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
            budinessProducts.map(item => (
              <ProductItem
                key={item.id}
                {...item}
                onPress={this.modifyProductPrice(item)}
              />
            ))
          }
        </ContainerScrollView>
        <AddProduct
          count={
            budinessProducts.map((item) => {
              const { salesNumber = 0 } = item;
              return salesNumber;
            })
            .reduce((accumulator, currentValue) => (Number(accumulator + currentValue)), 0)
          }
          totalPrice={
            budinessProducts.map((item) => {
              const { salesTotalPrice = 0 } = item;
              return salesTotalPrice;
            })
              .reduce((accumulator, currentValue) => (Number(accumulator + currentValue)), 0)
          }
          onPress={this.onAddProduct}
        />
      </ContainerView>
    );
  }
}

CreateSalesChance.navigationOptions = ({ navigation }) => {
  const { goBack } = navigation;
  return ({
    title: '新建销售机会',
    headerLeft: (
      <LeftBackIcon
        onPress={() => goBack()}
      />
    ),
    headerRight: (
      <RightView
        onPress={navigation.state.params ? navigation.state.params.onPressRight : () => null}
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
