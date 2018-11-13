import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LeftBackIcon, RightView, CommStatusBar } from '../../../components/Layout';
import { theme, routers } from '../../../constants';
import { ContainerView } from '../../../components/Styles/Layout';
import okIcon from '../../../img/go.png';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { ProductType, PriceListType } from '../../../constants/enum';
import ProductListItem from './ProductListItem';
import { SalesChanceEnum } from '../../../constants/form';
import { width } from '../../../utils/scale';

const FlatList = styled.FlatList`
  flex: 1;
  background-color: white;
`;

const ListItem = styled.TouchableOpacity`
  padding: ${theme.moderateScale(11)}px ${theme.moderateScale(15)}px;
  flex-direction: row;
  align-items: center;
  background-color: ${theme.whiteColor};
`;

const Left = styled.Text`
  font-size: ${theme.moderateScale(16)}px;
  color: ${theme.primaryColor};
`;

const Body = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const Content = styled.Text`
  color: #939393;
  font-size: ${theme.moderateScale(14)}px;
`;

const Right = styled.View`
  padding: ${theme.moderateScale(5)}px;
`;

const RightIcon = styled.Image`
  width: ${theme.moderateScale(16)}px;
  height: ${theme.moderateScale(10)}px;
`;

const Footer = styled.View`
  flex-direction: row;
  height: ${theme.moderateScale(49)}px;
`;

const Button = styled.TouchableOpacity`
  width: ${width / 2}px;
  height: ${theme.moderateScale(49)}px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor || theme.whiteColor};
`;

const ButtonText = styled.Text`
  font-size: ${theme.moderateScale(18)}px;
  color: ${props => props.color || theme.primaryColor};
`;

class ProductPicker extends Component {
  constructor(props) {
    super(props);
    const {
      products = [],
      priceId,
      priceName,
    } = props.navigation.state.params;
    this.state = {
      products: products.map(item => ({
        ...item,
        checked: true,
      })),
      priceId,
      priceName,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }

  onPressRight = () => {
    const {
      state: { params: { callback } },
      goBack,
    } = this.props.navigation;
    const {
      products,
      priceId,
      priceName,
    } = this.state;
    callback && callback({
      products: products.filter(item => item.checked),
      priceId,
      priceName,
    });
    goBack();
  }

  onPressItem = (item) => {
    const {
      id,
      checked,
    } = item;
    const products = this.state.products.map(item => ({
      ...item,
      checked: id === item.id ? !checked : item.checked,
    }));
    this.setState({
      products,
    });
  }

  pickPrice =() => {
    const { navigate } = this.props.navigation;
    navigate(routers.priceList, {
      type: PriceListType,
      callback: (item) => {
        if (!Object.keys(item).length) return;
        this.setState({
          priceId: item.id,
          priceName: item.name,
        });
      },
    });
  }

  pickProduct = () => {
    const { navigate } = this.props.navigation;
    navigate(routers.productList, {
      type: ProductType,
      callback: (item) => {
        const { products } = this.state;
        const index = products.findIndex(p => p.id === item.id);
        if (index > -1) return;
        const {
          id,
          name,
          price,
          salesUnit,
          describe,
          tenantId,
          attachmentList,
        } = item;
        const obj = {
          id,
          productName: name,
          standardPrice: price,
          salesUnit,
          comment: describe,
          tenantId,
          attachmentList,
          productImage: attachmentList.length ? attachmentList[0].filePath : null,
          checked: true,
        };
        this.setState({ products: [...products, obj] });
      },
    });
  }

  cancel = () => {
    const { goBack } = this.props.navigation;
    goBack();
  }

  confirm = () => {
    console.log('confirmconfirmconfirmconfirmconfirm');

    const {
      state: {
        products,
        priceId,
        priceName,
      },
      props: { navigation: {
        state: { params: { callback } },
        goBack,
      } },
    } = this;
    console.log({ callback });

    callback && callback({
      products: products.filter(item => item.checked),
      priceId,
      priceName,
    });
    goBack();
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <ProductListItem
      item={item}
      onPressItem={this.onPressItem}
    />
  )

  renderItemSeparatorComponent = () => <HorizontalDivider height={1} />

  render() {
    const {
      products,
      priceId,
      priceName,
    } = this.state;
    return (
      <ContainerView
        bottomPadding
        backgroundColor="#F6F6F6"
      >
        <CommStatusBar />
        <HorizontalDivider />
        <ListItem onPress={this.pickPrice}>
          <Left>
              价格表
          </Left>
          <Body>
            <Content>{(priceId && priceName) ? priceName : SalesChanceEnum.price}</Content>
          </Body>
          <Right>
            <RightIcon source={okIcon} />
          </Right>
        </ListItem>
        <HorizontalDivider />
        <ListItem onPress={this.pickProduct}>
          <Left>
              产品目录
          </Left>
          <Body>
            <Content>全部</Content>
          </Body>
          <Right>
            <RightIcon source={okIcon} />
          </Right>
        </ListItem>
        <HorizontalDivider height={1} />
        <FlatList
          data={products}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
        />
        <Footer>
          <Button
            onPress={this.cancel}
            backgroundColor="red"
          >
            <ButtonText>
              取消
            </ButtonText>
          </Button>
          <Button
            backgroundColor={theme.primaryColor}
            onPress={this.confirm}
          >
            <ButtonText color={theme.whiteColor}>
              {`确认(${products.filter(item => item.checked).length})`}
            </ButtonText>
          </Button>
        </Footer>
      </ContainerView>
    );
  }
}

ProductPicker.navigationOptions = ({ navigation }) => {
  const { goBack } = navigation;
  return ({
    title: '添加产品',
    headerLeft: (
      <LeftBackIcon
        onPress={() => goBack()}
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
};

ProductPicker.propTypes = {
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

export default ProductPicker;
