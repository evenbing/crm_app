import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx/';
import { observer } from 'mobx-react/native';
import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import ProductItemList from './components/ProductItemList';

import ProductListModel from '../../../logicStores/productList';

const NavListView = styled.View`
  margin-top: ${moderateScale(10)};
  margin-bottom: ${moderateScale(10)};
`;

useStrict(true);

@observer
class ProductList extends React.Component {
  componentDidMount() {
    ProductListModel.getProductClazzListReq();
  }
  onNavHandler = (path) => {
    path;
    // this.props.navigation.navigate(path);
  };

  render() {
    const list = [
      {
        list: [{}, {}],
      },
      {
        list: [{}],
      },
    ];

    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <NavListView>
          {
            list.map((obj, index) => <ProductItemList key={index} data={obj} />)
          }
        </NavListView>
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
