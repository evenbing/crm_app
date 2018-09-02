import React, { Component } from 'react';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';

import { LeftBackIcon, CommStatusBar } from '../../../components/Layout';
import { moderateScale } from '../../../utils/scale';
import productImg from '../../../img/crm/ico_product.png';
import ProductItem from './components/ProductItem';

const products = [
  {
    key: uuidv1(),
    image: productImg,
    title: '电脑主机',
    price: '标准价格：¥7000',
    status: '已启用',
  },
  {
    key: uuidv1(),
    image: productImg,
    title: '电脑主机',
    price: '标准价格：¥7000',
    status: '已启用',
  },
  {
    key: uuidv1(),
    image: productImg,
    title: '电脑主机',
    price: '标准价格：¥7000',
    status: '已启用',
  },
];

const ContainerView = styled.View`
  flex: 1;
  background-color: white;
`;

const ProductList = styled.FlatList`
  background-color: white;
  padding: 0px ${moderateScale(15)}px;
`;

class StandardPriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  keyExtractor = item => item.key;

  renderItem = ({ item }) => {
    const {
      image,
      title,
      price,
      status,
    } = item;
    return (<ProductItem
      image={image}
      title={title}
      price={price}
      status={status}
    />);
  }

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <ProductList
          data={products}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </ContainerView>
    );
  }
}

StandardPriceList.navigationOptions = () => ({
  title: '标准报价表',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default StandardPriceList;
