/**
 * @component CreateSalesChance.js
 * @description 销售线索更多页面
 * @time 2018/9/4
 * @author --
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';

// utils
import { isIos } from 'utils/utils';
import { delay, formatDateByMoment, formatDateType, formatNumberToString } from 'utils/base';
import Toast from 'utils/toast';

// constants
import { SalesChanceEnum } from 'constants/form';
import { routers } from 'constants';
import theme from 'constants/theme';
import {
  CustomerType,
  MarkActivityType,
  OpportunityTypes,
  OpportunitySource,
  PriceListType,
} from 'constants/enum';

// components
import {
  CommStatusBar,
  LeftBackIcon,
  RightView,
} from 'components/Layout';
import {
  ContainerScrollView,
  ContainerView,
} from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import TitleItem from 'components/Details/TitleItem';
import DateTimePicker from 'components/DateTimePicker';
import { CenterText, RightText } from 'components/Styles/Form';
import NavInputItem from 'components/NavInputItem';
import ProductItem from './components/ProductItem';
import AddProduct from './components/AddProduct';

import SalesChanceStore from '../../../logicStores/salesChance';
import BusinessStore from '../../../logicStores/business';
import { getNewId } from '../../../service/app';

@observer
class EditorMore extends React.Component {
  state = {
    name: null,
    customerId: null,
    customerName: null,
    priceId: null,
    priceName: null,
    budgetCost: null,
    actualCost: null,
    planAmount: null,
    salesPhaseId: null,
    salesPhaseName: null,
    expectedDate: null,
    expectedDateShow: null,
    description: null,
    departmentId: null,
    departmentName: null,
    activityId: null,
    activityName: null,
    opportunityType: null,
    opportunityTypeName: null,
    sourceType: null,
    sourceTypeName: null,
    budinessProducts: [],
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.initState();

    const { id } = this.props.navigation.state.params.item;
    // 编辑
    if (id) {
      // BusinessStore.getBusinessDetailReq({
      //   opportunityId: id,
      // }, (budinessProducts) => {
      //   this.setState({
      //     budinessProducts,
      //   });
      // });
    }
  }
  onPressRight = async () => {
    const {
      state: {
        name,
        customerId,
        customerName,
        priceId,
        planAmount,
        salesPhaseId,
        salesPhaseName,
        expectedDate,
        departmentId,
        departmentName,
        budinessProducts,
      },
      props: { navigation: {
        pop,
        state: { params: { reFetchDataList } },
      } },
    } = this;
    try {
      if (!name) throw new Error(SalesChanceEnum.name);
      if (!expectedDate) throw new Error(SalesChanceEnum.expectedDate);
      if (!customerId || !customerName) throw new Error(SalesChanceEnum.customer);
      if (!salesPhaseId || !salesPhaseName) throw new Error(SalesChanceEnum.salesPhase);
      if (!planAmount) throw new Error(SalesChanceEnum.planAmount);
      if (!departmentId || !departmentName) throw new Error(SalesChanceEnum.department);

      const businessId = await getNewId();
      if (budinessProducts.length > 0) {
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
          opportunityId: businessId,
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
      const { id } = this.props.navigation.state.params.item;
      // 新增
      if (!id) {
        SalesChanceStore.createSalesChanceReq(this.state, () => {
          reFetchDataList && reFetchDataList();
          pop(2);
        });
        return;
      }
      if (!id) throw new Error('id 不为空');
      SalesChanceStore.updateSalesChanceReq(this.state, () => {
        pop(1);
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
  onFocus = async (y = 40) => {
    await delay();
    this.scrollViewRef.scrollTo({
      x: 0,
      y: theme.moderateScale(isIos() ? y : y + 30),
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
    let {
      expectedDate,
    } = item;
    if (expectedDate) {
      expectedDate = formatDateByMoment(expectedDate);
    }
    this.setState({
      ...formatNumberToString(item),
      budinessProducts: item.budinessProducts || [],
      expectedDate,
    });
  };

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
        budgetCost,
        actualCost,
        planAmount,
        priceId,
        priceName,
        salesPhaseId,
        salesPhaseName,
        expectedDateShow,
        description,
        departmentId,
        departmentName,
        activityId,
        activityName,
        opportunityType,
        opportunityTypeName,
        sourceType,
        sourceTypeName,
        budinessProducts,
      },
      props: { navigation: { navigate } },
    } = this;
    return (
      <ContainerView>
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
            leftText="机会名称"
            {...theme.getLeftStyle({
                placeholder: SalesChanceEnum.name,
                value: name,
                onChangeText: name => this.setState({ name }),
            })}
          />
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
                      SalesChanceEnum.customer
                  }
              </CenterText>
              }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="价格表"
            onPress={() => navigate(routers.priceList, {
              type: PriceListType,
              callback: (item) => {
                if (!Object.keys(item).length) return;
                this.setState({
                  priceId: item.id,
                  priceName: item.name,
                });
              },
            })}
            center={
              <CenterText active={priceId && priceName}>
                {
                  (priceId && priceName) ? priceName :
                    SalesChanceEnum.price
                }
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="机会类型"
            onPress={() => navigate(routers.typePicker, {
              selectedKey: opportunityType,
              typeEnum: OpportunityTypes,
              callback: (key, value) => {
                this.setState({
                  opportunityType: key,
                  opportunityTypeName: value,
                });
              },
            })}
            center={
              <CenterText active={opportunityType && opportunityTypeName}>
                {(opportunityType && opportunityTypeName) ? opportunityTypeName : SalesChanceEnum.opportunityType}
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
                onFocus: () => this.onFocus(80),
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
          <NavInputItem
            leftText="机会来源"
            onPress={() => navigate(routers.typePicker, {
              selectedKey: sourceType,
              typeEnum: OpportunitySource,
              callback: (key, value) => {
                this.setState({
                  sourceType: key,
                  sourceTypeName: value,
                });
              },
            })}
            center={
              <CenterText active={sourceType && sourceTypeName}>
                {(sourceType && sourceTypeName) ? sourceTypeName : SalesChanceEnum.sourceType}
              </CenterText>
            }
            {...theme.navItemStyle}
          />
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
          <DateTimePicker
            mode="date"
            onConfirm={
              (date) => {
                this.setState({
                  expectedDate: formatDateByMoment(date),
                  expectedDateShow: formatDateByMoment(date, formatDateType),
                });
              }
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
            leftText="项目预算"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: SalesChanceEnum.budgetCost,
                value: budgetCost,
                onChangeText: budgetCost => this.setState({ budgetCost }),
                onFocus: () => this.onFocus(300),
            })}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="实际花费"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: SalesChanceEnum.actualCost,
                value: actualCost,
                onChangeText: actualCost => this.setState({ actualCost }),
                onFocus: () => this.onFocus(350),
            })}
            right={
              <RightText>元</RightText>
            }
          />
          <TitleItem text="其他信息" />
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
          <NavInputItem
            leftText="备注"
            height={44}
            center={<View />}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              value={description}
              onChangeText={description => this.setState({ description })}
              placeholder={SalesChanceEnum.description}
              placeholderTextColor={theme.textPlaceholderColor}
              onFocus={() => this.onFocus(420)}
              onBlur={() => this.onFocus(0)}
            />
          </TextareaGroup>
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
          <HorizontalDivider height={20} />
        </ContainerScrollView>
        <AddProduct
          count={
            budinessProducts.map((item) => {
              const { salesNumber = 0 } = item;
              return salesNumber;
            })
              .reduce((accumulator, currentValue) => (accumulator + currentValue), 0)
          }
          totalPrice={
            budinessProducts.map((item) => {
              const { salesTotalPrice = 0 } = item;
              return salesTotalPrice;
            })
              .reduce((accumulator, currentValue) => (accumulator + currentValue), 0)
          }
          onPress={this.onAddProduct}
        />
      </ContainerView>
    );
  }
}

EditorMore.navigationOptions = ({ navigation }) => ({
  title: '销售机会详情',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
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

EditorMore.defaultProps = {};

EditorMore.propTypes = {
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

export default EditorMore;
