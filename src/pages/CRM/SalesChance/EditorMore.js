import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import uuidv1 from 'uuid/v1';

import theme from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';
// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView, ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
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

const CenterText = styled.Text`
  font-size: ${moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
`;

const RightText = CenterText.extend`
  color: ${theme.textColor};
`;

const NavItemStyle = {
  leftWidth: moderateScale(113),
  height: 44,
  showNavIcon: true,
};

class EditorMore extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => alert('finish');
  getLeftStyle = (placeholder, width = 110) => {
    return {
      inputProps: {
        placeholder,
        fontSize: moderateScale(16),
      },
      leftTextStyle: {
        color: '#373737',
        width: moderateScale(width),
      },
      height: 44,
    };
  };
  render() {
    return (
      <ContainerView>
        <ContainerScrollView
          bottomPadding
        >
          <CommStatusBar />
          <HorizontalDivider
            height={12}
          />
          <ListView>
            <TitleItem text="基本信息" />
            <NavInputItem
              leftText="活动名称"
              {...this.getLeftStyle('请输入活动名称')}
              {...NavItemStyle}
            />
            <NavInputItem
              leftText="客户"
              center={
                <CenterText>请选择客户</CenterText>
            }
              {...NavItemStyle}
            />
            <NavInputItem
              leftText="价格表"
              center={
                <CenterText>请选择价格表</CenterText>
            }
              {...NavItemStyle}
            />
            <NavInputItem
              leftText="机会类型"
              center={
                <CenterText>请选择机会类型</CenterText>
            }
              {...NavItemStyle}
            />
            <NavInputItem
              leftText="销售金额"
              {...this.getLeftStyle('请输入销售金额')}
              right={
                <RightText>元</RightText>
            }
            />
            <NavInputItem
              leftText="来源"
              center={
                <CenterText>请选择来源</CenterText>
            }
              {...NavItemStyle}
            />
            <NavInputItem
              leftText="市场活动"
              center={
                <CenterText>请选择市场活动</CenterText>
            }
              {...NavItemStyle}
            />
            <NavInputItem
              leftText="结单日期"
              center={
                <CenterText>请选择结单日期</CenterText>
            }
              {...NavItemStyle}
            />
            <NavInputItem
              leftText="项目预算"
              {...this.getLeftStyle('请输入金额')}
              right={
                <RightText>元</RightText>
            }
            />
            <NavInputItem
              leftText="实际花费"
              {...this.getLeftStyle('请输入金额')}
              right={
                <RightText>元</RightText>
            }
            />
            <TitleItem text="其它信息" />
            <NavInputItem
              leftText="所属部门"
              center={
                <CenterText>请选择所属部门</CenterText>
            }
              {...NavItemStyle}
            />
            <NavInputItem
              leftText="备注"
              center={<View />}
              right={<View />}
            />
            <TextareaGroup>
              <TextareaView
                rowSpan={5}
                bordered
                placeholder="请输入备注说明"
                placeholderTextColor={theme.textPlaceholderColor}
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
          </ListView>
          <HorizontalDivider height={20} />
        </ContainerScrollView>
        <AddProduct
          count="20"
          totalPrice="900000"
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
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
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
