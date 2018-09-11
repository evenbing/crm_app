import React, { Component } from 'react';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';
import { observer } from 'mobx-react/native';

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

@observer
class StandardPriceList extends Component {
  componentDidMount() {
    PriceListModel.getStandardPriceListReq();
  }

  renderItem = ({ item }) => (
    <ProductItem {...item} />
  );

  render() {
    const {
      standardPriceList: { list, refreshing, loadingMore },
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

StandardPriceList.navigationOptions = () => ({
  title: '标准报价表',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default StandardPriceList;
