/**
 * @component ProductBusiness.js
 * @description 产品商机页面
 * @time 2018/12/31
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx/';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon } from 'xn-react-native-applets';

// logicStores
import ProductBusinessStore from 'logicStores/business';

// components
import { ContainerView } from 'components/Styles/Layout';
import FlatListTable from 'components/FlatListTable';
import ProductItem from './components/ProductItem';

useStrict(true);

@observer
class ProductBusiness extends React.Component {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {
      state: {
        params = {},
      },
    } = this.props.navigation;
    ProductBusinessStore.getProductBusinessListReq(params);
  };

  render() {
    const {
      businessDetail: { list, refreshing },
      topList,
    } = ProductBusinessStore;
    // console.log(toJS(topList));
    const flatProps = {
      data: topList,
      renderItemElem: <ProductItem />,
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

ProductBusiness.navigationOptions = ({ navigation }) => ({
  title: '产品商机列表',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

ProductBusiness.defaultProps = {};

ProductBusiness.propTypes = {
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

export default ProductBusiness;
