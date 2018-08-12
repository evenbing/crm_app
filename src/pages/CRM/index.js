import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import LinearGradient from 'react-native-linear-gradient';
import uuidv1 from 'uuid/v1';

import { moderateScale } from '../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { HeadItem } from '../../components/CRM';
import NavItem from '../../components/NavItem';
import { routers } from '../../constants';


const ContainerView = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const HeaderView = styled.View`
  height: ${moderateScale(100)};
  flex-direction: row;
`;

const NavListView = styled.View`
  margin-top: ${moderateScale(10)};
  margin-bottom: ${moderateScale(10)};
`;

useStrict(true);

const HeadList = [
  {
    key: uuidv1(),
    icon: require('../../img/crm/customerIcon.png'),
    text: '客户',
    path: routers.customer,
  },
  {
    key: uuidv1(),
    icon: require('../../img/crm/saleIcon.png'),
    text: '销售机会',
    path: '',
  },
  {
    key: uuidv1(),
    icon: require('../../img/crm/statisticsIcon.png'),
    text: '业绩统计',
    path: '',
  },
];

const NavList = [
  {
    key: uuidv1(),
    icon: require('../../img/crm/qrCode.png'),
    title: '市场活动',
    path: routers.markActivity,
  },
  {
    key: uuidv1(),
    icon: require('../../img/crm/qrCode.png'),
    title: '销售线索',
    path: routers.salesClues,
  },
  {
    key: uuidv1(),
    icon: require('../../img/crm/qrCode.png'),
    title: '联系人',
    path: '',
  },
  {
    key: uuidv1(),
    icon: require('../../img/crm/qrCode.png'),
    title: '合同',
    path: '',
  },
  {
    key: uuidv1(),
    icon: require('../../img/crm/qrCode.png'),
    title: '回款计划',
    path: '',
  },
  {
    key: uuidv1(),
    icon: require('../../img/crm/qrCode.png'),
    title: '回款记录',
    path: '',
  },
  {
    key: uuidv1(),
    icon: require('../../img/crm/qrCode.png'),
    title: '产品',
    path: routers.productList,
  },
  {
    key: uuidv1(),
    icon: require('../../img/crm/qrCode.png'),
    title: '价格表',
    path: routers.priceList,
  },
];

@observer
class CRM extends React.Component {
  onNavHandler = (path) => {
    this.props.navigation.navigate(path);
  };

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <LinearGradient
          start={{ x: 1.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={['#98CE5E', '#019D55']}
        >
          <HeaderView>
            { HeadList.map((item, index) => (
              <HeadItem
                key={item.key}
                isLast={index === HeadList.length - 1}
                data={item}
                onPress={() => this.onNavHandler(item.path)}
              />
            )) }
          </HeaderView>
        </LinearGradient>

        <NavListView>
          {
            NavList.map((obj, index) => (
              <NavItem
                leftText={obj.title}
                icon={obj.icon}
                key={obj.key}
                isLast={index === NavList.length - 1}
                onPress={() => this.onNavHandler(obj.path)}
              />
            ))
          }
        </NavListView>
      </ContainerView>
    );
  }
}

CRM.navigationOptions = ({ navigation, screenProps }) => {
  return ({
    title: 'CRM',
    headerLeft: (
      <LeftBackIcon
        onPress={navigation.state.params ? navigation.state.params._close : null}
      />
    ),
  });
};

CRM.defaultProps = {};

CRM.propTypes = {
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

export default CRM;
