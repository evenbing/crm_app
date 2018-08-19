import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import NavItem from '../../../components/NavItem';
import { routers } from '../../../constants';

const ContainerView = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const NavListView = styled.View`
  margin-top: ${moderateScale(10)};
  margin-bottom: ${moderateScale(10)};
`;

useStrict(true);

const NavList = [
  {
    leftText: '标准价格表',
    leftTextStyle: {},
    rightText: '未启用',
    rightTextStyle: {
      color: '#AEAEAE',
    },
    height: 44,
    path: routers.standardPriceList,
  },
  {
    leftText: '内部报价',
    leftTextStyle: {},
    rightText: '启用',
    rightTextStyle: {
      color: '#18B548',
    },
    height: 44,
    path: routers.internalPriceList,
  },
];

@observer
class PriceList extends React.Component {
  onNavHandler = (path) => {
    this.props.navigation.navigate(path);
  };

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <NavListView>
          {
            NavList.map((item, index) => (<NavItem
              key={index}
              {...item}
              isLast={index === NavList.length - 1}
              onPress={() => this.onNavHandler(item.path)}
            />))
          }
        </NavListView>
      </ContainerView>
    );
  }
}

PriceList.navigationOptions = () => ({
  title: '价格表',
  headerLeft: (
    <LeftBackIcon />
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
