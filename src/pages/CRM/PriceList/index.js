/**
 * @component index.js
 * @description 价格表页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch } from 'react-native';
import { useStrict } from 'mobx/';
import { observer } from 'mobx-react/native';
import { moderateScale } from '../../../utils/scale';
import { routers, theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import NavItem from '../../../components/NavItem';
import FlatListTable from '../../../components/FlatListTable';

import PriceListModel from '../../../logicStores/priceList';

const NavItemView = styled.View`
  background-color: #FFFFFF;
  padding: 0 ${theme.moderateScale(14)}px;
`;

useStrict(true);

@observer
class PriceList extends React.Component {
  componentDidMount() {
    this.getData();
  }
  onToggleSwitch = ({ item, index }) => {
    debugger;
  };
  onPressItem = ({ item }) => {
    this.props.navigation.navigate(routers.priceDetailList, { item });
  };
  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = PriceListModel.priceList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };
  getData = (pageNumber = 1) => {
    PriceListModel.getPriceListReq({ pageNumber });
  };
  renderItem = (itemProps) => {
    const { item, index } = itemProps;
    return (
      <NavItemView>
        <NavItem
          leftText={item.name}
          height={44}
          onPress={() => this.onPressItem({ item, index })}
          right={
            <Switch
              value={!!item.isActive}
              onValueChange={() => this.onToggleSwitch({ item, index })}
              onTintColor={theme.primaryColor}
              style={{
                transform: [
                  { scale: 0.8 },
                  { translateX: moderateScale(10) },
                ],
              }}
            />
          }
        />
      </NavItemView>
    );
  };
  render() {
    const {
      priceList: { list, refreshing, loadingMore },
    } = PriceListModel;
    const flatProps = {
      data: list,
      renderItem: this.renderItem,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
    };
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider height={15} />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

PriceList.navigationOptions = ({ navigation }) => ({
  title: '价格表',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

PriceList.defaultProps = {};

PriceList.propTypes = {
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

export default PriceList;
