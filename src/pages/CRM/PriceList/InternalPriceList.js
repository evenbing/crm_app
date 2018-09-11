import React, { Component } from 'react';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';
import { observer } from 'mobx-react/native';

// components
import { LeftBackIcon, CommStatusBar } from '../../../components/Layout';
import { moderateScale } from '../../../utils/scale';
import productImg from '../../../img/crm/ico_product.png';
import ProductItem from './components/ProductItem';
import FlatListTable from '../../../components/FlatListTable';

// model
import PriceListModel from '../../../logicStores/priceList';

const products = [
  {
    key: uuidv1(),
    image: productImg,
    title: '电脑主机',
    price: '内部价格：¥7000',
    status: '已启用',
  },
  {
    key: uuidv1(),
    image: productImg,
    title: '电脑主机',
    price: '内部价格：¥7000',
    status: '已启用',
  },
  {
    key: uuidv1(),
    image: productImg,
    title: '电脑主机',
    price: '内部价格：¥7000',
    status: '已启用',
  },
];

const ContainerView = styled.View`
  flex: 1;
  background-color: white;
`;

@observer
class InternalPriceList extends Component {
  componentDidMount() {
    PriceListModel.getInternalPriceListReq();
  }

  renderItem = ({ item }) => (
    <ProductItem {...item} />
  );

  render() {
    const {
      internalPriceList: { list, refreshing, loadingMore },
    } = PriceListModel;
    const flatProps = {
      data: products,
      renderItem: this.renderItem,
      ItemSeparatorComponent: null,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
      flatListStyle: {
        paddingLeft: moderateScale(15),
        paddingRight: moderateScale(15),
      },
    };
    return (
      <ContainerView>
        <CommStatusBar />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

InternalPriceList.navigationOptions = () => ({
  title: '内部报价表',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default InternalPriceList;
