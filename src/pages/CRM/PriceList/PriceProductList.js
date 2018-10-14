import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';

// components
import { LeftBackIcon, CommStatusBar } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import ProductItem from './components/ProductItem';
import FlatListTable from '../../../components/FlatListTable';

// model
import PriceListModel from '../../../logicStores/priceList';

@observer
class PriceProductList extends React.Component {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {
      navigation: {
        state: { params: { item = {} } },
      },
    } = this.props;
    PriceListModel.getPriceProductListReq({ id: item.id });
  };

  render() {
    const {
      priceProductList: { list, refreshing },
    } = PriceListModel;
    const flatProps = {
      data: list,
      renderItemElem: <ProductItem />,
      onRefresh: this.getData,
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

PriceProductList.navigationOptions = ({ navigation }) => {
  const {
    goBack,
    state: { params },
  } = navigation;
  return ({
    title: params.item.name || null,
    headerLeft: (
      <LeftBackIcon
        onPress={() => goBack()}
      />
    ),
  });
};

PriceProductList.propTypes = {
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

export default PriceProductList;
