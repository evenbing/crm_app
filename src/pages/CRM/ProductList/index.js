import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useStrict, toJS } from 'mobx/';
import { observer } from 'mobx-react/native';
// import { moderateScale } from '../../../utils/scale';
// import { theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
// import { HorizontalDivider } from '../../../components/Styles/Divider';
import FlatListTable from '../../../components/FlatListTable';
import ProductItemList from './components/ProductItemList';

import ProductListModel from '../../../logicStores/productList';

// const NavListView = styled.View`
//   margin-top: ${moderateScale(10)};
//   margin-bottom: ${moderateScale(10)};
// `;

useStrict(true);

@observer
class ProductList extends React.Component {
  componentDidMount() {
    this.getData();
  }
  // onNavHandler = (path) => {
  //   // this.props.navigation.navigate(path);
  // };

  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = ProductListModel.productList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };

  getData = (pageNumber = 1) => {
    ProductListModel.getProductClazzListReq({ pageNumber });
  };

  renderItem = (itemProps) => {
    // const { item } = itemProps;
    return (
      <ProductItemList {...itemProps} />
    );
  };

  render() {
    const {
      productList: { list, topList, refreshing, loadingMore },
    } = ProductListModel;
    const flatProps = {
      data: topList,
      renderItem: this.renderItem,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
    };
    console.log(toJS(topList));
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

ProductList.navigationOptions = ({ navigation }) => ({
  title: '产品目录',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

ProductList.defaultProps = {};

ProductList.propTypes = {
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

export default ProductList;
