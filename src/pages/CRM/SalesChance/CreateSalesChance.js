import React, { Component } from 'react';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';
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

const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const CenterTet = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
`;

const NavItemStyle = {
  leftWidth: theme.moderateScale(83),
  height: 44,
  showNavIcon: true,
};

class CreateSalesChance extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    return (
      <ContainerView>
        <ContainerScrollView
          bottomPadding
        >
          <CommStatusBar />
          <TitleItem
            text="必填信息"
            fontSize={16}
            titleBackColor="transparent"
          />
          <ListView>
            <NavInputItem
              leftText="姓名"
              inputProps={{
                'placeholder': '请输入姓名',
                fontSize: theme.moderateScale(16),
              }}
              leftTextStyle={{
                color: '#373737',
                width: theme.moderateScale(80),
              }}
              height={44}
            />
            <NavInputItem
              leftText="公司名称"
              inputProps={{
                'placeholder': '请输入公司名称',
                fontSize: theme.moderateScale(16),
              }}
              leftTextStyle={{
                color: '#373737',
                width: theme.moderateScale(80),
              }}
              height={44}
            />
            <NavInputItem
              leftText="市场活动"
              center={
                <CenterTet>请选择活动</CenterTet>
              }
              {...NavItemStyle}
            />
            <NavInputItem
              leftText="所属部门"
              center={
                <CenterTet>请选择所属部门</CenterTet>
              }
              {...NavItemStyle}
            />
          </ListView>
          <HorizontalDivider
            height={20}
          />
          <CreateMoreButton
            onPress={() => navigate(routers.createCustomerMore)}
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

CreateSalesChance.navigationOptions = ({ navigation }) => ({
  title: '新建销售机会',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={() => alert(1)}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

export default CreateSalesChance;
