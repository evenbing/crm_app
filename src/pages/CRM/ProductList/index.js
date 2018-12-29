import React from 'react';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx/';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon } from 'xn-react-native-applets';

// components
import { ContainerView } from 'components/Styles/Layout';
import FlatListTable from 'components/FlatListTable';
import ProductItemList from './components/ProductItemList';

import ProductListModel from '../../../logicStores/productList';
import { ProductType } from '../../../constants/enum';

useStrict(true);

@observer
class ProductList extends React.Component {
  componentDidMount() {
    this.getData();
  }

  // onPressItem = ({ item }) => {
  //   this.props.navigation.navigate(routers.modifyProductPrice, { item });
  // };

  onPressItem = ({ item }) => {
    const {
      state: { params: {
        type,
        callback,
      } = {} },
      goBack,
    } = this.props.navigation;
    if (type === ProductType) {
      callback && callback(item);
      goBack();
    }
  }

  getData = () => {
    const {
      state: {
        params: {
          priceId,
        } = {},
      },
    } = this.props.navigation;
    ProductListModel.getProductClazzListReq({ priceId });
  };

  renderItem = (itemProps) => {
    const {
      onPressSelectIndex,
    } = ProductListModel;
    return (
      <ProductItemList
        onPressSelectIndex={onPressSelectIndex}
        onPressItem={this.onPressItem}
        {...itemProps}
      />
    );
  };

  render() {
    const {
      productList: { list, refreshing },
      topList,
    } = ProductListModel;
    // console.log(toJS(topList));
    const flatProps = {
      data: topList,
      renderItem: this.renderItem,
      onRefresh: this.getData,
      keyExtractor: item => item.id,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
    };
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
